import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Member extends Component {

    constructor(props) {
        super(props);

        this.state = {
            members: [],
            Id: 0,
            MemberName: "",
            Details: ""
        }
    }

    refreshList() {

        fetch(variables.API_URL + 'Members')
            .then(response => response.json())
            .then(data => {
                this.setState({ members: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeMemberName = (e) => {
        this.setState({ MemberName: e.target.value });
    }
    changeDetails = (e) => {
        this.setState({ Details: e.target.value });
    }


    addClick() {
        this.setState({
            modalTitle: "Add Member",
            Id: 0,
            MemberName: "",
            Details: ""
        });
    }
    editClick(m) {
        debugger;
        this.setState({
            modalTitle: "Edit Member",
            Id: m.id,
            MemberName: m.memberName,
            Details: m.details
        });
    }

    createClick() {
        fetch(variables.API_URL + 'Members', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                MemberName: this.state.MemberName,
                Details: this.state.Details
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        fetch(variables.API_URL + 'Members/' + this.state.Id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: this.state.Id,
                MemberName: this.state.MemberName,
                Details: this.state.Details
            })
        })
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert(error);
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'Members/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert(error);
                })
        }
    }



    render() {
        const {
            members,
            modalTitle,
            Id,
            MemberName,
            Details
        } = this.state;

        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Member
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                 Id
                            </th>
                            <th>
                                Member Name
                            </th>
                            <th>
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member =>
                            <tr key={member.id}>
                                <td>{member.memberName}</td>
                                <td>{member.details}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(member)}>
                                            Edit
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(member.id)}>
                                         Delete
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Member Name</span>
                                            <input type="text" className="form-control"
                                                value={MemberName}
                                                onChange={this.changeMemberName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Details</span>
                                            <input type="text" className="form-control"
                                                value={Details}
                                                onChange={this.changeDetails} />
                                        </div>


                                    </div>

                                </div>

                                {Id === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {Id !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}