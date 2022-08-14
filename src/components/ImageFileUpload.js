import { Button} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

export default class ImgFileUpload extends React.Component {
    constructor() {
        super();
        this.setupReader()
        this.state = {
            selectedFile: undefined,
            imageBase64: '',
            initialImageBase64: '',
            pending: false,
            status: 'INIT',

        }
        this.onChange = this.onChange.bind(this);
        this.fileInput = React.createRef();
    }
    setupReader() {
        this.reader = new FileReader();
        this.reader.addEventListener('load', (event) => {
            const { initialImageBase64 } = this.state;
            // var { changedImage } = this.props;
            const imageBase64 = event.target.result;
            const image = 
                {
                  filename: this.fileInput.current.files[0].name,
                  content: imageBase64,
                }
              
            this.props.setImage(image);
            // changedImage(imageBase64);
            if (initialImageBase64) {
                this.setState({ imageBase64 });
            } else {
                this.setState({ imageBase64, initialImageBase64: imageBase64 });
            }
        });
    }
    onChange(event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            this.setState({
                selectedFile,
                initialImageBase64: ''
            });
            this.reader.readAsDataURL(selectedFile);
        }
    }
    render() {
        return (
            <div>
                
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={this.onChange}
                    ref={this.fileInput}
                />
                <label htmlFor="raised-button-file">
                    <Button startIcon={<AddIcon />} variant="raised" component="span">
                        Add Image
                    </Button>
                </label>
            </div>
        )
    }
} 