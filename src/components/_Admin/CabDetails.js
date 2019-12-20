import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
    Card,
    CardTitle,
    Badge,
    CardText,
    ListGroupItemHeading,
    UncontrolledCollapse,
    FormGroup,
    FormFeedback,
    FormText,
    // CustomInput,
    UncontrolledTooltip,
    Spinner,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody,
    ListGroupItemText
}
    from 'reactstrap';

import _ from 'lodash';
import FileUpload from "../../component/FileUpload";
import Validation from "../Common/Validation";
// import axios from "axios";
import {toast} from 'react-toastify';
import $ from "jquery";
import moment from 'moment';

import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Layout from '../../_Layouts/Header.js'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';

class CabDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FormData: {
                id: '',
                imageid: null,
                regno: '',
                company: '',
                model: '',
                type: '',
                state: '',
                district: '',
                postalcode: '',
                status: ''
            },
            validationTest: false,
            loading: false,
            updateFlag: false,
            cabList: [],
            noDataFound: false

        };

    }

    componentDidMount() {
        this.getAllCabDetails();
    }

    clearFormData(){
        this.setState({
            FormData: {
                ...this.state.FormData,
                id: '',
                imageid: null,
                regno: '',
                company: '',
                model: '',
                type: '',
                state: '',
                district: '',
                postalcode: '',
                status: ''
            },
            validationTest: false,
            loading: false,
            updateFlag: false
        });
    }

    getFormValue(e){
        this.setState({
            FormData: {
                ...this.state.FormData,
                [e.target.name]: e.target.value
            },
            validationTest: false
        },() => {
            // console.log(this.state.FormData);
        })
    }
    addCarDetails(){
        this.setState({
            validationTest: true,
            loading: true
        })

        if(Validation.stringValidate(this.state.FormData.regno) &&
            Validation.stringValidate(this.state.FormData.company) &&
            Validation.stringValidate(this.state.FormData.model) &&
            Validation.stringValidate(this.state.FormData.type) &&
            Validation.stringValidate(this.state.FormData.state) &&
            Validation.stringValidate(this.state.FormData.district) &&
            Validation.positiveNumber(this.state.FormData.postalcode)){

            var FormData = {
                imageid: this.state.FormData.imageid,
                regno: this.state.FormData.regno,
                company: this.state.FormData.company,
                model: this.state.FormData.model,
                type: this.state.FormData.type,
                state: this.state.FormData.state,
                district: this.state.FormData.district,
                postalcode: this.state.FormData.postalcode,
                status: 1
            }                        
                this.props.insertcab(FormData).then((response) => {
                const res = response;
                console.log(res);

                if(res.status === 200 && res.statusText === "OK"){
                    this.setState({loading: false});
                    toast.success('Cab added successful');
                    this.clearFormData();
                    this.getAllCabDetails();
                }else{
                    toast.error('Something wrong with cab addition');
                    this.setState({loading: false});
                }

            }).catch((error) => {
                console.log("Inside catch block login Admin" + error);
                this.setState({loading: false});
            });
        }else{
            toast.error('One or more required fields are missing');
            this.setState({loading: false});
        }
    }


    UpdateCarDetails=()=>{
        this.setState({
            validationTest: true,
            loading: true
        })

        if(Validation.stringValidate(this.state.FormData.regno) &&
            Validation.stringValidate(this.state.FormData.company) &&
            Validation.stringValidate(this.state.FormData.model) &&
            Validation.stringValidate(this.state.FormData.type) &&
            Validation.stringValidate(this.state.FormData.state) &&
            Validation.stringValidate(this.state.FormData.district) &&
            Validation.positiveNumber(this.state.FormData.postalcode)){


            var FormData = {
                imageid: this.state.FormData.imageid,
                regno: this.state.FormData.regno,
                company: this.state.FormData.company,
                model: this.state.FormData.model,
                type: this.state.FormData.type,
                state: this.state.FormData.state,
                district: this.state.FormData.district,
                postalcode: this.state.FormData.postalcode,
            }                        
            this.props.updatecab(this.state.FormData.id,FormData).then((response) => {
                const res = response;
                console.log(res);

                if(res.status === 200 && res.statusText === "OK"){
                    this.setState({loading: false});
                    toast.success('Cab Updated successful');
                    this.clearFormData();
                    this.getAllCabDetails();
                }else{
                    toast.error('Something wrong with cab Update');
                    this.setState({loading: false});
                }

            }).catch((error) => {
                console.log("Inside catch block cab update" + error);
                this.setState({loading: false});
            });
        }else{
            toast.error('One or more required fields are missing');
            this.setState({loading: false});
        }
    }



    singleFetchUpdateCall(id){
        console.log(id);
        $('html, body').animate({
            scrollTop: $("#mainId").offset().top
        }, 600);
        // axios.get('http://localhost:4000/api/cab/getcabbyid/'+id).then((response) => {
            this.props.getcabbyid(id).then((response)=>{
            const res = response;
            console.log(res);
            if(res.status === 200 && res.statusText === "OK"){
                console.log(res.data.cabs[0]);
                this.setState({
                    FormData: {
                        ...this.state.FormData,
                        id: res.data.cabs[0].id,
                        imageid: res.data.cabs[0].imageid,
                        regno: res.data.cabs[0].regno,
                        company: res.data.cabs[0].company,
                        model: res.data.cabs[0].model,
                        type: res.data.cabs[0].type,
                        state: res.data.cabs[0].state,
                        district: res.data.cabs[0].district,
                        postalcode: res.data.cabs[0].postalcode,
                    },
                    updateFlag: true
                })

            }else{
                toast.error('Something wrong with cab List Fetch API');
            }


        }).catch((error) => {
            console.log("Inside catch block fetch all cab" + error);

        });
    }

    getAllCabDetails(){

        // axios.get('http://localhost:4000/api/cab').then((response) => {
            this.props.getallcab().then((response) => {
            const res = response;
            console.log(res);
            if(res.status === 200 && res.statusText === "OK"){
                if(res.data.cabs.length < 1){
                    this.setState({cabList: res.data.cabs , noDataFound: true})
                }else{
                    this.setState({cabList: res.data.cabs , noDataFound: false})
                }
            }else{
                toast.error('Something wrong with cab List Fetch API');
            }

        }).catch((error) => {
            console.log("Inside catch block fetch all cab" + error);

        });
    }


    render() {

        return (

           <div>
               <div className="jumbotron" id="mainId">

                   <div className="jumbotron cabdetails-modal" >

                       <ListGroup className={'margin-top-2x'}>
                           <ListGroupItem className={'grey lighten-5'}>
                               <ListGroupItemHeading id="cis" className={'pt-1 black-text pointer font-1-8x'}>
                                   {/*<i className={'material-icons left font-1-8x mr-1 relative'}>assignment_ind</i>*/}
                                   Cab Information
                                   {/*<i className='material-icons float-right font-2x'>arrow_drop_down_circle</i>*/}
                               </ListGroupItemHeading>
                               <UncontrolledCollapse toggler="#cis" isOpen={true}>
                                   <ListGroup className={'mt-3 card-shadow'}>
                                       <ListGroupItem className={'padding-2x'}>
                                           <FormGroup className="inline">
                                               <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Registration Number</Label>
                                               <Input type="text"
                                                      name="regno"
                                                      value={this.state.FormData.regno}
                                                      className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.regno) && 'error')}`}
                                                      onChange={this.getFormValue.bind(this)}/>
                                           </FormGroup>

                                           <FormGroup className={'mt-4'}>
                                               <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Company</Label>
                                               <Input type='textarea' name="company"
                                                      value={this.state.FormData.company}
                                                      className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.company) && 'error')}`}
                                                      onChange={this.getFormValue.bind(this)}
                                               />
                                               <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                                           </FormGroup>

                                           <FormGroup className={'mt-4'}>
                                               <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Model</Label>
                                               <Input type={'textarea'}  name="model"
                                                      value={this.state.FormData.model}
                                                      className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.model) && 'error')}`}
                                                      onChange={this.getFormValue.bind(this)}

                                               />
                                           </FormGroup>

                                           <Row className={'mt-3'}>
                                               <Col sm={3}>
                                                   <FormGroup>
                                                       <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>Cab Type</Label>
                                                       <Input type="text" name="type"
                                                              value={this.state.FormData.type}
                                                              className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.type) && 'error')}`}
                                                              onChange={this.getFormValue.bind(this)}
                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col sm={3}>
                                                   <FormGroup>
                                                       <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>State</Label>
                                                       <Input type="text" name="state"
                                                              value={this.state.FormData.state}
                                                              className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.state) && 'error')}`}
                                                              onChange={this.getFormValue.bind(this)}
                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col sm={3}>
                                                   <FormGroup>
                                                       <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>District</Label>
                                                       <Input type="text" name="district"
                                                              value={this.state.FormData.district}
                                                              className={`${this.state.validationTest && (!Validation.stringValidate(this.state.FormData.district) && 'error')}`}
                                                              onChange={this.getFormValue.bind(this)}

                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col sm={3}>
                                                   <FormGroup>
                                                       <Label className={'grey-text text-darken-2 font-1-2x capitalize'}>postal code</Label>
                                                       <Input type="number" name="postalcode"
                                                              value={this.state.FormData.postalcode}
                                                              className={`${this.state.validationTest && (!Validation.positiveNumber(this.state.FormData.postalcode) && 'error')}`}
                                                              onChange={this.getFormValue.bind(this)}
                                                       />
                                                   </FormGroup>
                                               </Col>
                                           </Row>

                                           <Row className={'mt-6'}>
                                               <Col sm={6}>
                                                    <FileUpload />
                                               </Col>
                                           </Row>
                                       </ListGroupItem>
                                   </ListGroup>
                               </UncontrolledCollapse>
                           </ListGroupItem>
                       </ListGroup>


                       <Row>
                           {/*<Col sm={{ size: 2, offset: 8 }}>
                            <Button className={'brand-primary capitalize float-right mt-4'}
                                    onClick={parentThis.invoicePreviewToggle.bind(parentThis)}>
                                Preview
                            </Button>
                        </Col>*/}



                           <Col sm={{ size: 3, offset: 9 }}>
                               {
                                   this.state.updateFlag ?
                                       <Button className="float-right brand-primary capitalize text-center mt-4 mr-0 flex"
                                               onClick={this.UpdateCarDetails.bind(this)}
                                               disabled={this.state.loading}>
                                           Update
                                       </Button>
                                       :
                                       <Button className="float-right brand-primary capitalize text-center mt-4 mr-0 flex"
                                               onClick={this.addCarDetails.bind(this)}
                                               disabled={this.state.loading}>
                                           Save
                                       </Button>
                               }
                           </Col>

                       </Row>

                   </div>

                   <div className="jumbotron cabdetails-list">

                       <ListGroup className={'padding-2x'}>
                           {

                               this.state.cabList.length > 0 && this.state.cabList.map((val, i) =>
                                   <ListGroup key={i}>

                                       <ListGroupItem className={'card-shadow mb-2 padding-top-2x padding-left-3x padding-right-3x padding-bottom-x hvr-underline-reveal'} key={i}>
                                           <div className="ribbon__item">
                                                <span className={'white-text bold font-x uppercase text-center ui-success'}>
                                                cheque
                                                </span>
                                           </div>
                                           <ListGroupItemHeading className={'bolder font-1-5x relative mb-0'} style={{top:-10}}>
                                               <Badge color="light" className={'pt-2 pl-2 pr-4 pb-2 font-1-2x thin-border-dashed left-align'}>
                                                   {val.regno}
                                               </Badge>
                                           </ListGroupItemHeading>
                                           <ListGroupItemHeading className={'bolder font-2x float-left'}>
                                               {val.company}
                                               <i id={"pr__contact-"+i} className={'material-icons grey-text text-darken-2 font-1-8x top-0-2x left-0-5x relative'}>
                                                   info_outline
                                               </i>

                                               <UncontrolledTooltip placement="right" target={"pr__contact-"+i}>
                                            <span className={'grid right left-align padding-0-5x'}>
                                                <b>Address : </b>
                                                <label className={'mt-1'}>
                                                    {
                                                        val.district
                                                    }<br/>
                                                    {
                                                        val.postalcode
                                                    }
                                                </label>
                                                <b>State : </b>
                                                <label className={'mt-1'}>
                                                    {
                                                        val.state
                                                    }
                                                    <br/>
                                                </label>
                                            </span>
                                               </UncontrolledTooltip>
                                           </ListGroupItemHeading>

                                           <Button className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'} style={{top: "-7px"}} color="link"
                                                   onClick={this.singleFetchUpdateCall.bind(this,val.id)}>
                                               <img width={25} id={"pr__edit-"+i} className={'padding-0-2x'}
                                                    src={require("../../static/images/edit.png")}/>
                                               <UncontrolledTooltip placement="top" target={"pr__edit-"+i}>
                                                   Edit
                                               </UncontrolledTooltip>
                                           </Button>

                                           {/*<Button id="UncontrolledPopover" className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'} style={{top: "-7px"}} color="link">
                                           <i id={"pr__share-"+i} className={'material-icons relative top-0-2x font-2x'}>share</i>
                                           <img width={25} id={"pr__share-"+i} className={'padding-0-2x'}
                                                src={"../../static/images/007-share.png"}/>
                                           <UncontrolledTooltip placement="top" target={"pr__share-"+i}>
                                               Share via Email
                                           </UncontrolledTooltip>

                                       </Button>*/}

                                           {/*<UncontrolledPopover placement="bottom" className="no-border card-shadow" target="UncontrolledPopover">
                                           <PopoverHeader className={'capitalize'}>enter an email address</PopoverHeader>
                                           <PopoverBody>

                                               <Input type="text"/>
                                           </PopoverBody>
                                       </UncontrolledPopover>

                                       <Button className={'pt-0 pb-0 pl-1 pr-1 relative float-right right-0-5x left-x'}  style={{top: "-7px"}} color="link">
                                           <i id={"pr__download-"+i} className={'material-icons relative top-0-2x font-2x'}>cloud_download</i>
                                           <img id={"pr__download-"+i} width={25} className={'padding-0-2x'}
                                                src={"/static/images/028-download.png"}/>

                                       </Button>*/}

                                           <ListGroupItemText className={'mt-2 mb-2 clear'}>
                                               <Badge className={'pt-2 pl-0 pr-4 pb-2 transparent font-1-2x no-border black-text left-align'}>
                                                   {val.model} <span className={'font-1-2x grey-text text-darken-4 light relative ml-0'}> <br/><br/>{
                                                           "Cab Registered with us from ( " + moment(val.createdAt).format('LL') + " )"
                                                     }</span>
                                               </Badge>
                                           </ListGroupItemText>

                                           <ListGroupItemText className={'mt-2 mb-0 font-1-2x grey-text text-darken-3'}>
                                               driver details &nbsp; <code>Licence Number</code>
                                           </ListGroupItemText>

                                           <Badge pill color={'light'} className={'float-right small-border padding-1-5x font-2x absolute right-2x text-uppercase'} style={{bottom: '25px'}}>
                                               {
                                                   val.type
                                               }
                                           </Badge>
                                       </ListGroupItem>
                                   </ListGroup>
                               )}


                       </ListGroup>

                       {
                           this.state.noDataFound &&
                           <ListGroup className={'padding-2x mt-2'} style={{border: '2px solid black'}}>
                                <div style={{margin: '20px auto'}} className="grey-text font-1-8x">No Data Found</div>
                            </ListGroup>

                       }
                   </div>




               </div>

           </div>

        );
    }
}



// export default CabDetails;
const mapStateToProps = state => ({  
    loginResponse: state.authReducer,
    token: state.authReducer.token,  
    isAuthenticated: state.authReducer.isAuthenticated
  });
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps) (withRouter(CabDetails));

