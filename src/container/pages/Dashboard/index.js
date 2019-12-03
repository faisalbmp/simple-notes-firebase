import React, {Component,Fragment} from 'react';
import './Dashboard.scss';
import {addDataToAPI,getDataFromAPI, updateDataFromAAPI, deleteDataApi} from '../../../config/redux/action';
import { connect } from 'react-redux';

class Dashboard extends Component{

    state= {
        title: '',
        date:'',
        content:'',
        textButton:'UPDATE',
        noteId:''
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid);
    }

    handleSaveNotes = () => {
        // console.log("value handle", this.props.userData)
        const {title,content,noteId,textButton} = this.state;
        const {saveNotes,updateNotes} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'));

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }
        if(textButton ==='SIMPAN'){
            saveNotes(data)
        }else{
            data.noteId = noteId;
            updateNotes(data);
        }
    }

    onInputChange = (e,type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    updateNotes = (note)=>{
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton:'UPDATE',
            noteId: note.id
        })
    }

    cancelUpdate = ()=>{
        this.setState({
            title:'',
            content:'',
            textButton:'SIMPAN'
        })
    }
    deleteNote = (e,note)=>{
        e.stopPropagation();
        const userData = JSON.parse(localStorage.getItem('userData'))

        const {deleteNote} = this.props
        const data = {
            userId: userData.uid,
            noteId:note.id
        }
        deleteNote(data);
    }

    render(){
        const {title,content,date,textButton} = this.state;
        const {notes} = this.props;
        const {updateNotes,deleteNote}=this;
        return(
            <div className="container">
                <div className="input-form">
                    <input placeholder="title" value={title} className="input-title" onChange={(e) => this.onInputChange(e,'title')}/>
                    <textarea placeholder="content" value={content} className="input-content" onChange={(e) => this.onInputChange(e,'content')}></textarea>
                    <div className="action-wrapper">
                        {
                            textButton === 'UPDATE' ? (
                                <button className="save-btn cancel" onClick={this.cancelUpdate}>cancel</button>
                            ) : <div/>
                        }
                        <button className="save-btn" onClick={this.handleSaveNotes}>{textButton}</button>
                    </div>
                </div>
                <hr />
                {
                    notes.length >0 ?(
                        <Fragment>
                            {
                                notes.map(note =>{
                                    return(
                                        <div className="card-content" key={note.id} onClick={()=>updateNotes(note)}>
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                            <div className="delete-btn" onClick={(e)=>deleteNote(e,note)}>x</div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) :null
                }
            </div>
        )
    }
}

const reduxState = (state) =>( {
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) =>({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataFromAAPI(data)),
    deleteNote: (data) => dispatch(deleteDataApi(data))
})

export default connect(reduxState,reduxDispatch)(Dashboard);