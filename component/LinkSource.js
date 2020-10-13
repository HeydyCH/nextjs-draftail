// @flow
import React, { Component } from "react";

import { RichUtils, EditorState } from "draft-js";
import { EntityInstance } from "draft-js";

import Modal from "../component/Modal";

class LinkSource extends Component {
  constructor(props) {
    super(props);

    const { entity } = this.props;
    const state = {
      url: "",
    };

    if (entity) {
      const data = entity.getData();
      state.url = data.url;
    }

    this.state = state;

    this.onRequestClose = this.onRequestClose.bind(this);
    this.onAfterOpen = this.onAfterOpen.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onChangeURL = this.onChangeURL.bind(this);
  }

  /* :: onConfirm: (e: Event) => void; */
  onConfirm(e) {

    console.log('onConfirm e', e);

    const { editorState, entityType, onComplete } = this.props;
    const { url } = this.state;

    e.preventDefault();

    const contentState = editorState.getCurrentContent();

    const data = {
      url: url.replace(/\s/g, ""),
    };
    const contentStateWithEntity = contentState.createEntity(
      entityType.type,
      "MUTABLE",
      data,
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const nextState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey,
    );

    console.log('onConfirm e', e);

    onComplete(nextState);
  }

  /* :: onRequestClose: (e: SyntheticEvent<>) => void; */
  onRequestClose(e) {
    const { onClose } = this.props;
    e.preventDefault();

    onClose();
  }

  /* :: onAfterOpen: () => void; */
  onAfterOpen() {
    const input = this.inputRef;

    if (input) {
      input.focus();
      input.select();
    }
  }

  /* :: onChangeURL: (e: Event) => void; */
  onChangeURL(e) {
    console.log('onChangeURL e', e);

    if (e.target instanceof HTMLInputElement) {
      const url = e.target.value;
      console.log('url', url);

      this.setState({ url });
    }
  }



  render() {
    const { url } = this.state;
    console.log('LinkSource');
    return (
      <Modal
        onRequestClose={this.onRequestClose}
        onAfterOpen={this.onAfterOpen}
        isOpen
        contentLabel="Link chooser"
      >
        <form className="LinkSource" onSubmit={this.onConfirm}>
          <label className="form-field">
            <span className="form-field__label">Link URL</span>
            <input
              ref={(inputRef) => {
                this.inputRef = inputRef;
              }}
              type="text"
              onChange={this.onChangeURL}
              value={url}
              placeholder="www.example.com"
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </Modal>
    );
  }
}

export default LinkSource;
