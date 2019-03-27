import React, { Component } from "react";
import { Storage, API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./Notes.css";

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isDeleting: false,
      isLoading: false,
      note: null,
      content: "",
      attachmentURL: null
    };
  }

  async componentDidMount() {
    try {
      let attachmentURL;
      let note = await this.getNote();
      let { content, attachment } = note;

      if (attachment) {
        attachmentURL = await Storage.vault.get(attachment);
      }

      this.setState({
        note,
        attachmentURL,
        content
      });
    } catch (e) {
      alert(e.message);
    }
  }

  getNote() {
    return API.get("notes", `/notes/${this.props.match.params.id}`);
  }

  saveNote(note) {
    return API.put("notes", `/notes/${this.props.match.params.id}`, {
      body: note
    });
  }

  deleteNote() {
    return API.del("notes", `/notes/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleFileChange = event => {
    this.file = event.target.files[0];
  };

  handleSubmit = async event => {
    let attachment;

    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    this.setState({ isLoading: true });

    try {
      attachment = this.file ? await s3Upload(this.file) : null;

      await this.saveNote({
        content: this.state.content,
        attachment: attachment || this.state.note.attachment
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  handleDelete = async event => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    this.setState({ isDeleting: true });
    try {
      await this.deleteNote();
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);

      this.setState({ isDeleting: false });
    }
  };

  render() {
    return (
      <div className="Notes">
        {this.state.note && (
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content">
              <FormControl
                componentClass="textarea"
                value={this.state.content}
                onChange={this.handleChange}
              />
            </FormGroup>
            {this.state.note.attachment && (
              <FormGroup>
                <ControlLabel>Attachment</ControlLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.attachmentURL}
                  >
                    {this.state.note.attachment}
                  </a>
                </FormControl.Static>
              </FormGroup>
            )}
            {!this.state.note.attachment && (
              <FormGroup controlId="file">
                <ControlLabel>Attachment</ControlLabel>
                <FormControl onChange={this.handleFileChange} type="file" />
              </FormGroup>
            )}
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              text="Save"
              isLoading={this.state.isLoading}
              loadingText="Saving..."
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              onClick={this.handleDelete}
              text="Delete"
              isLoading={this.state.isDeleting}
              loadingText="Deleting..."
            />
          </form>
        )}
      </div>
    );
  }
}
