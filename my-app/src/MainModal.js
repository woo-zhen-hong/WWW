import React, { useEffect, useState } from 'react';
import { Select, Tag, Form, Modal, Row, Col, Button, Affix, Radio, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const MainModal = (props) => {
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
                        <Row gutter={[8, 16]} justify={'center'} >
                            <Form
                                // form={form}
                                onFinish={(values) => {
                                    console.log(values)
                                }}
                                wrapperCol={{
                                    span: 18
                                }}
                                labelCol={{
                                    span: 6
                                }}
                            >
                                <Form.Item
                                    name={'account'}
                                    label={'帳號'}
                                    rules={[
                                        {
                                            required: true,
                                            message: '請記得填寫姓名喔'
                                        }
                                    ]}
                                >
                                    <Select
                                        defaultValue="lucy"
                                        style={{
                                            width: '100%',
                                        }}
                                        // onChange={handleChange}
                                        options={[
                                            {
                                                value: 'jack',
                                                label: 'Jack',
                                            },
                                            {
                                                value: 'lucy',
                                                label: 'Lucy',
                                            },
                                            {
                                                value: 'Yiminghe',
                                                label: 'yiminghe',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name={'money'}
                                    label={'金額'}
                                    rules={[
                                        {
                                            required: true,
                                            message: '請記得填寫金額喔'
                                        }
                                    ]}
                                    // initialValue={props.editcard.money}

                                >
                                    <Input value={props.editcard.money} placeholder='請輸入金額' />
                                </Form.Item>
                                <Form.Item
                                    name={'password'}
                                    label={'備註'}
                                    // initialValue={props.editcard.note}
                                >
                                    <Input value={props.editcard.note} placeholder='請輸入備註' />
                                </Form.Item>
                                <Form.Item
                                    name={'password'}
                                    wrapperCol={{ offset: 6 }}
                                >
                                    <Checkbox>提醒通知</Checkbox>
                                </Form.Item>
                            </Form>
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