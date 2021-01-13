import PropTypes from "prop-types";
import { useState } from "react";

const BasicUpload = props => {
  const [imagename, setImagename] = useState(props.placeholder);

  function getFileName(event) {
    let fileName = event.target.files[0].name;
    setImagename(fileName);
    props.change;
  }

  return (
    <div className={`form-group ${props.containerClass}`}>
      <label>Upload file</label>
      <div className="basic-upload-input">
        <label
          className="placeholder"
          htmlFor={!props.id ? props.name : props.id}
        >
          {props.fileName ? (
            <span>{props.fileName}</span>
          ) : (
            <span>{imagename}</span>
          )}
        </label>

        <input
          id={props.id}
          type="file"
          name={props.name}
          defaultValue={props.defaultValue}
          className="input-file"
          onFocus={props.focus}
          onBlur={props.blur}
          onChange={getFileName}
        />
        <span className="text-error small mtop10">{props.errorMessage}</span>
        <span className="text-warning small mtop10">
          {props.warningMessage}
        </span>
        <span className="text-success small mtop10">
          {props.successMessage}
        </span>
        {props.default && (
          <span
            className="text-default small mtop10"
            onClick={props.deleteFile}
          >
            {props.default}
          </span>
        )}
      </div>
    </div>
  );
};

BasicUpload.protoTypes = {
  containerClass: PropTypes.string,
  id: PropTypes.string,
  fileName: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  focus: PropTypes.func,
  blur: PropTypes.func,
  deleteFile: PropTypes.func,
  errorMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  successMessage: PropTypes.string,
  default: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default BasicUpload;
