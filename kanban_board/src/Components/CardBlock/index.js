import React, {useState, useEffect, useRef} from 'react';
import {UserOutlined, PlusCircleOutlined} from '@ant-design/icons'
import { Button, Modal, Input, DatePicker, Select } from 'antd';
import Moment from 'moment';
import {assigneeList, state} from '../../Constants/index'

const { Option } = Select

const CardBlock = () => {

    const [data, setData] = useState([{
        id:1,
        desc:"This is the first card",
        assignee: "John",
        dueDate: Moment().format("DD/MM/YYYY"),
        state: "Planned"
    },
    {
        id:2,
        desc:"This is the second card",
        assignee: "James",
        dueDate: Moment().format("DD/MM/YYYY"),
        state: "Planned"
    },
    {
        id:3,
        desc:"This is the third card",
        assignee: "James",
        dueDate: Moment().format("DD/MM/YYYY"),
        state: "Started"
    },
    {
        id:4,
        desc:"This is the fourth card",
        assignee: "John",
        dueDate: Moment().format("DD/MM/YYYY"),
        state: "Planned"
    },
    {
        id:5,
        desc:"This is the fifth card",
        assignee: "Joe",
        dueDate: Moment().format("DD/MM/YYYY"),
        state: "Started"
    },
    {
        id:6,
        desc:"This is the sixth card",
        assignee: "John",
        dueDate: Moment().format("DD/MM/YYYY"),
        state: "Done"
    }
    ]);
    let [currentId, setId] = useState(data.length)

    const [isActive, setActive] = useState(false),

    openAddModal = (e) => {
        setActive(true)
    },

    saveToList = () => {
        if(cardDetails.edit) {
            data.some((d) => {
                if(cardDetails.id === d.id) {
                    data.splice(d.id-1, 1);
                    setData(data)
                    return true;
                }
            });
            setData([
                ...data, {
                    id: cardDetails.id,
                    desc: cardDetails.desc,
                    state: cardDetails.state,
                    assignee: cardDetails.assignee,
                    dueDate: cardDetails.dueDate
                }
            ])
        } else {
            setId(currentId++)
            setData([...data, {
                id: currentId++,
                desc: cardDetails.desc,
                state: cardDetails.state,
                assignee: cardDetails.assignee,
                dueDate: cardDetails.dueDate
            }]);
        };
        setCardDetails({
            id: 0,
            desc: "",
            state: "",
            assignee: "",
            dueDate: ""
        })
        setActive(false)
    },

    [cardDetails, setCardDetails] = useState({
        desc: "",
        state: state[0],
        assignee: assigneeList[0],
        dueDate: Moment().format("DD/MM/YYYY")
    }),

    editCardDetails = (e) => {
        let id = parseInt(e.currentTarget.children[0].innerHTML);
        let card;
        data.some((d) => {
            if(d.id === id) {
                card = d;
                return true
            }
        })
        card.edit=true;
        setCardDetails(card)
        setActive(true)
    }

    useEffect(() => {
        data.sort((a, b) => a.id - b.id)
    }, [data])

    return (
        <div style={{display: 'flex'}}>
            {state.map((entry) => {
                return (
                    <div style={{width: "33%"}}>
                        <div style={{textAlign: "center", fontSize: "16px", fontWeight:"600"}}>{entry}
                            <div style={{border:"2px solid black", margin: "10px"}}>
                                <div>
                                    {data.length && data.map((d) => {
                                        if (d.state === entry) {
                                            return (
                                                <div onDoubleClick={(e) => editCardDetails(e)} style={{border: "1px solid black", margin: "10px", padding: "25px", textAlign: "left", fontSize: "14px", fontWeight: 'normal'}} key={d.id}>
                                                    <div id="dataId">{d.id}</div>
                                                    <div id="dataDesc">{d.desc}</div>
                                                    <div id="dataDue">Due: {d.dueDate}</div>
                                                    <div id="dataAssignee" style={{float: "right"}}>
                                                        <span style={{right: "10px", position: "relative"}}>{d.assignee}</span>
                                                        <UserOutlined />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <Button type="primary" onClick={(e) => openAddModal(e)}>
                                        <span>Add another task</span>
                                        <PlusCircleOutlined />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            <Modal
                title="Add new task"
                visible={isActive}
                footer={[
                    <Button onClick={(e) => saveToList(e)}>
                        Save
                    </Button>,
                    <Button onClick={() => setActive(false)}>
                        Cancel
                    </Button>
                ]}
                onCancel={() => setActive(false)}
            >
                <Input
                    type="text"
                    placeholder="Add description"
                    value={cardDetails.desc}
                    onChange={(e) => setCardDetails({...cardDetails, desc: e.target.value})}
                    style={{marginBottom: "15px"}}
                />
                <DatePicker
                    onChange={(e) => {
                        let date = Moment(e).format("DD/MM/YYYY")
                        setCardDetails({...cardDetails, dueDate: date})}}
                    style={{marginRight: "5px"}}
                />

                <Select style={{width: "150px"}} style={{marginRight: "5px"}} onChange={(value) => {setCardDetails({...cardDetails, state: value})}} defaultValue={state[0]}>
                    {state.map(s => {
                        return (
                            <Option value={s}>{s}</Option>
                        )
                    })}
                </Select>

                <Select style={{width: "150px"}} style={{marginRight: "5px"}} onChange={(value) => setCardDetails({...cardDetails, assignee: value})} defaultValue={assigneeList[0]}>
                    {assigneeList.map(s => {
                        return (
                            <Option value={s}>{s}</Option>
                        )
                    })}
                </Select>


            </Modal>

        </div>

    )
}

export default CardBlock;