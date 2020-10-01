import React from 'react';
import {assigneeList} from '../../Constants/index';
import {UserOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';

const HeaderBlock = () => {
    return (
        <div style={{display: "flex", padding: "20px"}}>
            <div style={{width: "70%"}}>
                Task board
            </div>
            <div>
                Members:
                {assigneeList.map((assignee) => {
                   return (
                        <Tooltip title={assignee}>
                            <UserOutlined style={{margin: "10px", fontSize: "25px"}} />
                        </Tooltip>
                    )
                })}
            </div>
        </div>
    )
}

export default HeaderBlock;