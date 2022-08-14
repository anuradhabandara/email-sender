import { TextField, Grid, Box, Button} from "@mui/material";
import ImgFileUpload from './ImageFileUpload';
import isEmail from 'validator/lib/isEmail';
import React from "react";


class ProfileForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            message: '',
            title: '',
            email: '',
            isValidEmail: false,
            isValidFirstName: false,
            isValidLastName: false,
            isValidMessage:false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
    }

    isSendDisabled = () => {
        if(this.state.isValidEmail 
            && this.state.isValidFirstName
            && this.state.isValidLastName
            && this.state.isValidMessage) {
            return false;
        }
        return true;
    }

    handleSubmit = () => {
        console.log("handle submit");
    }

    changeFirstName = (e) => {
        this.setState({ firstName: e.target.value ,
            isValidFirstName : e.target.value && e.target.value !== ''? true : false });
    }

    changeLastName = (e) => {
        this.setState({ lastName: e.target.value ,
            isValidLastName : e.target.value && e.target.value !== ''? true : false });
    }

    changeMessage = (e) => {
        this.setState({ message: e.target.value ,
            isValidMessage : e.target.value && e.target.value !== ''? true : false });
    }

    changeTitle = (e) => {
        this.setState({ title: e.target.value ,
            isValidTitle : e.target.value && e.target.value !== ''? true : false });
    }

    changeEmail = (e) => {
        if(isEmail(e.target.value)) {
            this.setState({ email: e.target.value,
                isValidEmail : true });              
         } else {
            this.setState({ email: e.target.value,
                isValidEmail : false });            
         }        
    }

    

    render() {
        return (
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    "&": {
                        m: 3,
                        p: 3,
                        border: "1px solid #ccc",
                        borderRadius: 4,
                    },
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="first-name"
                            label="First Name"
                            variant="outlined"
                            helperText="First Name is required."
                            required
                            fullWidth
                            error={!this.state.isValidFirstName}
                            onChange={this.changeFirstName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="last-name"
                            label="Last Name"
                            variant="outlined"
                            helperText="Last Name is required."
                            required
                            fullWidth
                            onChange={this.changeLastName}
                            error={!this.state.isValidLastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            helperText="Description is required."
                            rows={4}
                            multiline
                            fullWidth
                            required
                            onChange={this.changeMessage}
                            error={!this.state.isValidMessage}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label="Email Address"
                            variant="outlined"
                            helperText="Email is required."
                            required
                            fullWidth
                            onChange={this.changeEmail}
                            error={!this.state.isValidEmail}
                        />
                    </Grid>
                    <Grid item xs={12} container direction="row" justifyContent="flex-end">
                        {/* <div>
                                <Button startIcon={<AddIcon />}>Add Image</Button>
                                <Button variant="contained" type="submit">
                                    SAVE
                                </Button>
                            </div> */}

                        <ImgFileUpload
                            // handleSubmit={this.props.submitCb} 
                            setImage={this.props.setImage} />
                        <Button variant="contained" disabled={this.isSendDisabled()} onClick={() => this.props.submitCb({
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            message: this.state.message,
                            title: this.state.title,
                            email: this.state.email
                        })}>
                            SEND
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        );
    }
};

export default ProfileForm;

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Please enter email!';
    }
    if (!values.title) {
        errors.title = 'Please enter title!';
    }
    if (!values.message) {
        errors.message = 'Please enter message!';
    }
    return errors;
}
