import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProduct } from '../actions/productActions.js';
import productService from '../services/productService.js';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Input, Form, TextArea } from 'semantic-ui-react';
import Header from '../cmps/Header';


class EditProduct extends Component {
    state = {
        title: '',
        price: '',
        description: '',
        tags: []
    };

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        const { id } = this.props.match.params;
        if (!id) return;

        productService.get(id).then(user => {
            console.log('The user tags from the db', user.product.tags)
            this.setState({ ...user.product });
        })
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        value = ev.target.type === 'number' ? parseInt(value) : value;
        this.setState({ [name]: value });
    };

    handleSubmit = (ev) => {
        ev.preventDefault();
        const { id } = this.props.match.params;
        if (!id) return;
        productService.get(id)
            .then(user => {
                user.product = this.state;
                this.props.updateProduct(user);
            })
    };

    handleChange1 = (e, { value }) => {
        this.setState(prevState => ({ ...prevState, tags: value }));
    }

    // __makeSemantic() {
    //     return this.state.tags.map(tag => {
    //         return { value: tag, text: tag }
    //     })
    // }

    _makeSemantic() {
        return [
            { value: "Option1", text: "Option1" },
            { value: "Option2", text: "Option2" },
            { value: "Option3", text: "Option3" },
            { value: "Option4", text: "Option4" },
            { value: "Option5", text: "Option5" },
            { value: "Option6", text: "Option6" }
        ]
    }

    render() {
        console.log('This is the state', this.state);
        const { id } = this.props.match.params;
        const { title, price, description } = this.state;
        return (
            <div className="edit-product align-center justify-center column">
            <Header pathname={this.props.location.pathname}/>  
                
                <h1>Product Edit/Add</h1>
                <Form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Title:
                            <Input
                                className="edit-product-input"
                                value={title}
                                type="text"
                                name="title"
                                required
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Price:
                            <Input
                                className="edit-product-input"
                                value={price}
                                type="number"
                                name="price"
                                required
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Description:
                            <TextArea
                                value={description}
                                type="text"
                                name="description"
                                required
                                onChange={this.handleChange}
                            />
                            {/* </textarea> */}

                        </label>
                    </div>
                    <Dropdown multiple fluid placeholder='Tags' value={this.state.tags} options={this._makeSemantic()} onChange={this.handleChange1.bind(this)} />
                    <Button>Save</Button>
                    {/* <Link to={`/user/${id}`}></Link> */}
                </Form>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.product.product,
    };
};

const mapDispatchToProps = {
    updateProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)


// handleChangeMultiple = (event) => {
//     console.log('multiple', event)
//     const { options } = event.target;
//     const values = [];
//     if (options) {
//         for (let i = 0, l = options.length; i < l; i += 1) {
//             if (options[i].selected) {
//                 values.push(options[i].value);
//             }
//         }
//         this.setState(prevState => ({ ...prevState, tags: values }));
//     }
//     console.log('state from multiple', this.state);
// };