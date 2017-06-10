import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class CategoryDelete extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      category: props.category || null,
      error: null,
      onDelete: props.onDelete
    };
  }

  componentWillReceiveProps(nextProps){

    this.setState(prevState => ({
        ...prevState,
        category: nextProps.category ?  nextProps.category : null
    }));
  }

  delete(category) {
    fetch('http://localhost:3500/categories/' + category.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(data => {
      console.log(data);
      this.props.onDelete(category);
    })
    .catch(err => {
      //console.log(err.message);
      this.props.onError(new Error("Error happened on delete category"));
    });
   }

  render() {
    const { onCancel, show } = this.props;
    const { category, error } = this.state;
    const title = 'Delete category';

    return (
      <Modal show={show} onHide={() => onCancel()}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="categoryForm">
              <ControlLabel>Are you sure want to remove the {category && category.label} category ?</ControlLabel>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.delete(category)}>Confirm</Button>
          <Button onClick={() => onCancel()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CategoryDelete;
