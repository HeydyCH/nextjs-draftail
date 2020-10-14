// @flow
import React from "react";
import { Node } from "react";
import ReactModal from "react-modal";
// import "../../styles/Modal.css";

const Modal = (props) => (
	<ReactModal
		className="Modal"
		overlayClassName="Overlay"
		parentSelector={() => document.body}
		{...props}
	/>
);

export default Modal;
