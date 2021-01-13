import PropTypes from "prop-types";

const CustomUpload = props => {
  function displayImage(event) {
    let reader = new FileReader();
    let container = event.target.parentNode;
    reader.onload = function() {
      let dataURL = reader.result;
      if (dataURL.indexOf("data:image") !== -1) {
        let img = document.createElement("img");
        img.src = dataURL;
        container.appendChild(img);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    props.change;
  }

  function readImage(event) {
    event.preventDefault();
    let container = event.target.classList.contains("custom-uploader")
      ? event.target
      : event.target.parentNode;
    let drop = event.dataTransfer.files[0];
    let reader = new FileReader();
    reader.onload = function() {
      let dataURL = reader.result;
      if (dataURL.indexOf("data:image") !== -1) {
        let img = document.createElement("img");
        img.src = dataURL;
        container.appendChild(img);
      }
    };
    try {
      reader.readAsDataURL(drop);
    } catch (error) {
      //console.log(error);
    }
    props.change;
  }

  function dragoverHandler(ev) {
    ev.preventDefault();
  }

  return (
    <div
      className={`custom-uploader ${props.containerClass}`}
      onDrop={readImage}
      onDragOver={dragoverHandler}
    >
      <input
        type="file"
        name={props.name}
        id={props.id}
        onChange={displayImage}
      />
      <label htmlFor={!props.id ? props.name : props.id} className="pointer">
        {props.label}
      </label>
    </div>
  );
};

CustomUpload.protoTypes = {
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

export default CustomUpload;
