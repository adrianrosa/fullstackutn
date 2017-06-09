import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import CategoryModal from './CategoryModal';
import CategoriesList from './CategoriesList';
import './AdminCategories.css';

class AdminCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      status: 'init',
      error: null,
      showModal: false,
      selected: undefined,
      action: null
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleSaveCategory(categorySaved, isUpdate){
    
    let categoriesList = this.state.categories;
    if(isUpdate){
      categoriesList = categoriesList.filter(c => c.id !== categorySaved.id);
    }
    categoriesList.push(categorySaved);
    
    this.setState(prevState =>({
        ...prevState,
        status: 'success',
        categories: categoriesList,
        showModal: false,
        action: isUpdate ? 'updated' : 'added'
      }));
  }

  fetchCategories() {
    this.setState(prevState => ({
      ...prevState,
      status: 'pending'
    }));

    fetch('http://localhost:3500/categories')
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          ...prevState,
          status: 'success',
          categories: data
        }));
      })
      .catch(err => {
        this.setState(prevState => ({
          ...prevState,
          status: 'failure',
          error: err.message
        }));
      });
  }

  removeCategory(category) {
    
  }

  updateCategory(category) {
    this.setState(prevState => ({
      ...prevState,
      showModal: true,
      selected: category
    }));
  }

  addCategory(category) {
    this.setState(prevState => ({
      ...prevState,
      showModal: true,
      selected: undefined
    }));
  }

  hideModal() {
    this.setState(prevState => ({
      ...prevState,
      showModal: false,
      selected: undefined
    }));
  }

  handleError(err){
    this.setState(prevState => ({
      ...prevState,
      showModal: false,
      selected: undefined,
      action: 'error',
      error: err.message
    }));
  }

  render() {
    const { categories, status, error, showModal, selected, action } = this.state;

    return (
      <Grid>
        <PageHeader>
          Categories admin <small>Create, edit and remove categories</small>
        </PageHeader>

        <Row>
          <Col md={12}>
            <div className="AdminCategories-mainAction">
              <div><Button bsStyle="primary" bsSize="xs" onClick={() => this.addCategory()}>New Category</Button></div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            {action === 'added' && <div className="action-success">
                                      <label>Categoría agregada satisfactoriamente</label>
                                    </div>}
            {action === 'updated' && <div className="action-success">
                                      <label>Categoría modificada satisfactoriamente</label>
                                    </div>}
            {action === 'deleted' && <div className="action-success">
                                      <label>Categoría eliminada satisfactoriamente</label>
                                    </div>}
            {action === 'error' && <div className="action-failure">
                                      <label>{error}</label>
                                    </div>}
          </Col>
        </Row>

        <Row>
          {status === 'pending' && <Col md={12}>Loading...</Col>}

          {status === 'failure' && <div>Error: {error} </div>}

          {status === 'success' && <CategoriesList items={categories} onEdit={category => this.updateCategory(category)} onDelete={category => this.removeCategory(category)} />}
        </Row>

        <CategoryModal onCancel={() => this.hideModal()} show={showModal} category={selected} onError={err => this.handleError(err)} onSave={(categorySaved, isUpdate) => this.handleSaveCategory(categorySaved, isUpdate)} />
      </Grid>
    );
  }
}

export default AdminCategories;
