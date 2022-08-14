import React from 'react';
import ContactForm from './ContactForm';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';

import Grid from '@mui/material/Grid';
// import { ToastContainer, toast } from 'react-toastify';
const styles = {
    img: {
        height: 400,
        width: 400,
    }
};
class ImageFileSender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            note: '',
            loading: false,
            images: []
        }
        this.pristine = false;
        this.Send = this.Send.bind(this);
        this.SetImage = this.SetImage.bind(this);
    }

    async SetImage(image) {
        let newImages = [].concat(this.state.images);
        await newImages.push(image);
        await this.setState({ images: newImages });
    };
    Send(userData) {
        let images = this.state.images;
        userData = { ...userData, images };
        this.setState({ loading: true });
        this.sendEmail(userData).then(
            submited => {
                // toast.success('Email sent successfully');
                alert('Email sent successfully');
                this.setState({ key: 'cleared' })
                this.setState({ note: 'Email sent successfully', loading: false , images: []});
            },
        ).catch(errors => {
            // toast.error('Error occured')
            alert('Email - Error occured');
            <Snackbar
            open={true}
            anchorOrigin={{ vertical : 'center', horizontal: 'center' }}
            autoHideDuration={6000}
            message="Email sending fails!"
            />
            this.setState({ errors, loading: false })
        });
    };
    sendEmail = async emailData => {

        return axios.post('http://localhost:3000/api/v1/contact', emailData).then(
            res => res.data,
            err => Promise.reject(err.response.data.errors)
        )
    };
    render() {
        const { errors } = this.state;
        return (
            <div>
                <section id='contact'>
                    {this.state.loading && 
                        <Snackbar
                        open={true}
                        anchorOrigin={{ vertical : 'bottom', horizontal: 'right' }}
                        message="Sending...."
                      />
                    }
                    <div className='bwm-form'>
                        <div className='row'>
                            <div className='col-md-5'>
                                <h1>Email Sender</h1>
                                <ContactForm
                                    loading={this.state.loading}
                                    submitCb={this.Send}
                                    errors={errors}
                                    setImage={this.SetImage}
                                    pristine={this.pristine}
                                    key={this.state.key}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <Grid container justify="center" spacing={3}>
                        {this.state.images.map((item, i) => (
                            <Grid key={i} item>
                                <img src={item.content} style={styles.img} />
                            </Grid>
                        ))}
                    </Grid>

                </section>
            </div>
        )
    }
}
export default ImageFileSender;