import React, { useEffect, useState } from 'react';
import { Select, Tag, Form, Modal, Row, Col, Button, Affix, Radio, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import axios from "axios";
import styled from 'styled-components';

const MainModal = (props) => {
    const [friend_data, set_friend_data] = useState([]);
    useEffect(() => {
        axios
            .get('/backend/get_friend.php')
            .then((response) => {
                set_friend_data(response.data.data)
            })
    }, [])
    useEffect(() => {
        console.log(props.editcard);
    }, [props.editcard])
    return (
        <>
            <Modal
                style={{ pointerEvents: 'auto' }}
                open={props.open}
                onCancel={() => props.setOpen(false)}
                setOpen={props.setOpen}
                width={400}
                footer={false}
                className="modalStyle2"
                wrapClassName={"modalStyle2"}
                modalRender={(e) => <>
                    <Col span={24} style={{ backgroundColor: '#D7F5FF' }}>
                        <Row justify={'center'} align={'middle'} style={{ padding: '10px' }}>
                            <Col style={{ fontSize: '1.2rem', fontWeight: 400 }}>{props.title}</Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ backgroundColor: '#ffffff', padding: '20px' }}>
                        <Row gutter={[8, 16]} justify={'center'} align={'middle'}>

                            <Col span={5}>帳號</Col>
                            <Col span={17}>
                                <Select
                                    style={{
                                        width: '100%',
                                    }}
                                    value={props.editcard.name}
                                    labelInValue
                                    onChange={value => props.setEditCard(
                                        pre => {
                                            return (
                                                {
                                                    ...pre,
                                                    id: value.value,
                                                    name: value.label,
                                                }
                                            )
                                        }
                                    )}
                                    options={friend_data}
                                    placeholder='請選擇好友'
                                />
                            </Col>
                            <Col span={5}>金額</Col>
                            <Col span={17}>
                                <Input value={props.editcard.amount} placeholder='請輸入金額'
                                    onChange={e => props.setEditCard(
                                        pre => {
                                            return (
                                                {
                                                    ...pre,
                                                    amount: e.target.value
                                                }
                                            )
                                        }
                                    )} />
                            </Col>
                            <Col span={5}>備註</Col>
                            <Col span={17}>
                                <Input value={props.editcard.note} placeholder='請輸入備註'
                                    onChange={e => props.setEditCard(
                                        pre => {
                                            return (
                                                {
                                                    ...pre,
                                                    note: e.target.value
                                                }
                                            )
                                        }
                                    )} />
                            </Col>
                            <Col span={5}></Col>
                            <Col span={17}>
                                <Checkbox
                                    value={props.editcard.alert == '1 ' ? true : false}
                                    onChange={e => props.setEditCard(
                                        pre => {
                                            return (
                                                {
                                                    ...pre,
                                                    alert: e.target.checked ? '1' : '0',
                                                }
                                            )
                                        }
                                    )}>提醒通知</Checkbox>
                            </Col>
                            <Col span={24}>
                                <Row >
                                    <Col span={24}>
                                        <Affix offsetBottom={5}>
                                            <Row gutter={[10, 10]} align="bottom" justify={"center"}>
                                                <Col >
                                                    <Button
                                                        className='btn'
                                                        onClick={e => { props.edit ? props.handleEdit() : props.handleSubmit() }}
                                                        size='large' style={{ background: '#D7F5FF', color: 'black' }} block
                                                    >{props.edit ? '更新' : '送出'}</Button>
                                                </Col>
                                                <Col>
                                                    <Button className='btn' size='large' style={{ background: '#D9D9D9', color: 'black' }} onClick={(e) => props.setOpen(false)} block>取消</Button>
                                                </Col>
                                            </Row>
                                        </Affix>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </>}
                centered
            />
        </>
    )
}
export default MainModal;