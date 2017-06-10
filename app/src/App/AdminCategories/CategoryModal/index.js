import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class CategoryModal extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      category: props.category || { label: '' },
      status: 'init',
      error: null,
      onSave: props.onSave,
      onError: props.onError
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.category){
      this.setState(prevState => ({
        ...prevState,
        category: nextProps.category
      }));
    }
    else{
      this.setState(prevState => ({
        ...prevState,
        category: {label: ''}
      }));
    }
  }

  handleChange(e, key) {
    const value = e.target.value;

    this.setState(prevState => ({
      ...prevState,
      category: {
        ...prevState.category,
        [key]: value
      }
    }));
  }

  handleSave() {
    const { category } = this.state;
    category.id ? this.update(category) : this.save(category);
  }

  save(category) {
    fetch('http://localhost:3500/categories', {
      method: 'POST',
      body: JSON.stringify(category),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      category.id = data.ops[0].id;
      category._id = data.ops[0]._id;
      this.props.onSave(category, false);
      this.setState(prevState => ({
        ...prevState,
        category: { label: '' }
      }));
    })
    .catch(err => {
      //console.log(err.message);
      this.props.onError(new Error("Error happened on save category"));
    });
   }

  update(category) {
    const updateCategory = {id: category.id, label: category.label};
    fetch('http://localhost:3500/categories/' + category.id, {
      method: 'PUT',
      body: JSON.stringify(updateCategory),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      this.props.onSave(category, true);
      this.setState(prevState => ({
        ...prevState,
        category: { label: '' }
      }));
    })
    .catch(err => {
      //console.log(err);
      this.props.onError(new Error("Error happened on update category"));
    });
   }

  render() {
    const { onCancel, show } = this.props;
    const { category, error } = this.state;
    const edit = category && category.id;
    const title = edit ? 'Edit category' : 'Create Category';

    return (
      <Modal show={show} onHide={() => onCancel()}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="categoryForm">
              <ControlLabel>Category label</ControlLabel>
              <FormControl
                type="text"
                value={category.label}
                placeholder="category name"
                onChange={e => this.handleChange(e, 'label')}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.handleSave()}>Save</Button>
          <Button onClick={() => onCancel()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CategoryModal;
