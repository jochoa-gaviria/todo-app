import React, {Component} from 'react'
import moment from 'moment'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import todoDataService from '../../api/todo/todoDataService.js'
import authenticationService from './AuthenticationService.js'

class TodoComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id : this.props.match.params.id,
            description: '',
            targetDate : moment(new Date()).format('YYYY-MM-DD'),
            isDone : false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }


    componentDidMount(){

        if(this.state.id===-1) return

        let username = authenticationService.getLoggedInUserName()
        todoDataService.retrieveTodo(username,this.state.id)
        .then(response => this.setState({
            description: response.data.description,
            targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
            isDone : response.data.done
        }))
        .catch()
    }

    onSubmit(values){
        //console.log(values)
        let username = authenticationService.getLoggedInUserName()
        if(this.state.id===-1){
            todoDataService.addTodo(username,{
            id: values.id,
            description: values.description,
            targetDate: values.targetDate,
            done: values.isDone
            }).then(
                ()=>{
                    this.props.history.push(`/todos/`)
                }
            )
            .catch()
        }else{
            todoDataService.updateTodo(username,this.state.id, {
            id: values.id,
            description: values.description,
            targetDate: values.targetDate,
            done: values.isDone
            }).then(
                ()=>{
                    this.props.history.push(`/todos/`)
                }
            )
            .catch()
        }
    }

    validate(values){
        //console.log(values)
        let errors = {}
        if(!values.description){
             errors.description='please enter a Description'
        }else if (values.description.length<5){
             errors.description='Description field should have atleast 5 Characters'
        }
        
        if(!moment(values.targetDate).isValid || moment(values.targetDate).isBefore(moment().add(-1,'days'))){
            errors.targetDate="enter a valid date"
        }
        return errors
    }

    render(){
        let {id, description,targetDate,isDone} = this.state
        //let targetDate = this.state.targetDate
    return (
        <div>
            <h1>Todo</h1>
            <div className="container">
                <Formik
                initialValues={{
                    /*description:description,
                    targetDate:targetDate*/ //Same thing that line under this.
                    id,description,targetDate,isDone
                }}
                onSubmit={this.onSubmit}
                validate={this.validate}
                validateOnChange={true}
                validateOnBlur={false}
                enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description" placeholder="Enter a description here..."></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target date</label>
                                    <Field className="form-control" type="date" name="targetDate"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Is Done?</label>
                                    <Field className="form-control" as="select" name="isDone">
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                    </Field>
                                </fieldset>
                                <button className="btn btn-success btn-lg btn-block" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
    }
}

export default TodoComponent