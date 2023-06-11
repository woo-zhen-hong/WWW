import React, { useEffect, useState } from 'react';
import { Tabs, Upload, Layout, Modal, Row, Col, Button, message, DatePicker, Radio, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import axios from "axios";
import { Column, Pie, Line } from '@ant-design/plots';
import styled from 'styled-components';
const CustomTabs = styled.div`
    //tab的css設定
    .ant-tabs-tab{
        color: #bbb;
        font-size :1rem;
        font-weight: 400;
        border-radius: 10px;
    }
    //點擊tab後外面顏色改變、字變大、變粗
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active{
        font-size :1.5rem;
        font-weight: 700;
        background-color: #A6B3D2 !important;
    }
    //點擊tab字的顏色變白色
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
      color:#FFFFFF;
    }
    .ant-tabs-tab:hover {
        color: #gray;
        background: #FFF
        transform:scale(1.2)
    }
`;
const data = [
    {
        "name": "欠款",
        "month": "Jan.",
        "money": 200
    },
    {
        "name": "還款",
        "month": "Jan.",
        "money": 50
    },
    {
        "name": "欠款",
        "month": "Feb.",
        "money": 250
    },
    {
        "name": "還款",
        "month": "Feb.",
        "money": 150
    },
    {
        "name": "欠款",
        "month": "Mar.",
        "money": 100
    },
    {
        "name": "還款",
        "month": "Mar.",
        "money": 0
    },
    {
        "name": "欠款",
        "month": "Apr.",
        "money": 150
    },
    {
        "name": "還款",
        "month": "Apr.",
        "money": 150
    },
    {
        "name": "欠款",
        "month": "May.",
        "money": 100
    },
    {
        "name": "還款",
        "month": "May.",
        "money": 200
    },
    {
        "name": "欠款",
        "month": "Jun.",
        "money": 50
    },
    {
        "name": "還款",
        "month": "Jun.",
        "money": 150
    },
    {
        "name": "欠款",
        "month": "Jul.",
        "money": 100
    },
    {
        "name": "還款",
        "month": "Jul.",
        "money": 170
    },
    {
        "name": "欠款",
        "month": "Aug.",
        "money": 250
    },
    {
        "name": "還款",
        "month": "Aug.",
        "money": 50
    },
    {
        "name": "欠款",
        "month": "Sep.",
        "money": 100
    },
    {
        "name": "還款",
        "month": "Sep.",
        "money": 200
    },
    {
        "name": "欠款",
        "month": "Oct.",
        "money": 180
    },
    {
        "name": "還款",
        "month": "Oct.",
        "money": 130
    },
    {
        "name": "欠款",
        "month": "Nov.",
        "money": 190
    },
    {
        "name": "還款",
        "month": "Nov.",
        "money": 150
    },
    {
        "name": "欠款",
        "month": "Dec.",
        "money": 50
    },

    {
        "name": "還款",
        "month": "Dec.",
        "money": 150
    },

];
const data1 = [
    {
        "name": "欠款",
        "month": "Jan.",
        "money": 200
    },
    {
        "name": "欠款",
        "month": "Feb.",
        "money": 250
    },
    {
        "name": "欠款",
        "month": "Mar.",
        "money": 100
    },
    {
        "name": "欠款",
        "month": "Apr.",
        "money": 150
    },
    {
        "name": "欠款",
        "month": "May",
        "money": 100
    },
    {
        "name": "欠款",
        "month": "Jun.",
        "money": 50
    },
    {
        "name": "欠款",
        "month": "Jul.",
        "money": 100
    },
    {
        "name": "欠款",
        "month": "Aug.",
        "money": 250
    },
    {
        "name": "欠款",
        "month": "Sep.",
        "money": 100
    },
    {
        "name": "欠款",
        "month": "Oct.",
        "money": 180
    },
    {
        "name": "欠款",
        "month": "Nov.",
        "money": 190
    },
    {
        "name": "欠款",
        "month": "Dec.",
        "money": 50
    },
];
const data2 = [
    {
        "name": "還款",
        "month": "Jan.",
        "money": 50
    },
    {
        "name": "還款",
        "month": "Feb.",
        "money": 150
    },
    {
        "name": "還款",
        "month": "Mar.",
        "money": 0
    },
    {
        "name": "還款",
        "month": "Apr.",
        "money": 150
    },
    {
        "name": "還款",
        "month": "May.",
        "money": 200
    },
    {
        "name": "還款",
        "month": "Jun.",
        "money": 150
    },
    {
        "name": "還款",
        "month": "Jul.",
        "money": 170
    },
    {
        "name": "還款",
        "month": "Aug.",
        "money": 50
    },
    {
        "name": "還款",
        "month": "Sep.",
        "money": 200
    },
    {
        "name": "還款",
        "month": "Oct.",
        "money": 130
    },
    {
        "name": "還款",
        "month": "Nov.",
        "money": 150
    },
    {
        "name": "還款",
        "month": "Dec.",
        "money": 150
    },

];


const Charts = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [activeKey, setActivety] = useState(1);
    const [title, setTitle] = useState('');
    const [data, setData] = useState([]);
    const [data_debt, set_data_debt] = useState([{
        key: 1,
    },]);
    const [back_data, set_back_data] = useState([{
        key: 1,
    },]);
    useEffect(() => {
        getAllData();
    }, [])
    const getAllData = () => {
        axios
            .get('/backend/view_all_debt.php')
            .then((response) => {
                let arr = [];
                let test_data = response.data.data;
                test_data.forEach(element => {
                    let final_month = element["date"].charAt(5) + element["date"].charAt(6);
                    let final_vol;
                    if (element["tag"] === 1) {
                        final_vol = "欠款";
                    } else {
                        final_vol = "還款";
                    }
                    arr.push({
                        vol: final_vol,
                        month: final_month,
                        amount: Number(element["money"]),
                    })
                });
                setData(arr);
                //console.log(arr);
            })
    }
    const getBack = () => {
        axios
            .get('/backend/view_debt.php')
            .then((response) => {
                let arr = [];
                let test_data = response.data.data;
                test_data.forEach(element => {
                    let final_month = element["date"].charAt(5) + element["date"].charAt(6);
                    let final_vol;
                    if (element["tag"] === 1) {
                        final_vol = "欠款";
                    } else {
                        final_vol = "還款";
                    }
                    arr.push({
                        vol: final_vol,
                        month: final_month,
                        amount: Number(element["money"]),
                    })
                });
                set_data_debt(arr);
                //console.log(response);
            })
    }
    const getDebt = () => {
        axios
            .get('/backend/view_repay.php')
            .then((response) => {
                let arr = [];
                let test_data = response.data.data;
                test_data.forEach(element => {
                    let final_month = element["date"].charAt(5) + element["date"].charAt(6);
                    let final_vol;
                    if (element["tag"] === 1) {
                        final_vol = "欠款";
                    } else {
                        final_vol = "還款";
                    }
                    arr.push({
                        vol: final_vol,
                        month: final_month,
                        amount: Number(element["money"]),
                    })
                });
                set_back_data(arr);
                //console.log(response);
            })
    }
    useEffect(() => {
        if (activeKey == 1) {
            getAllData();
        } else if (activeKey == 2) {
            getBack();
        } else if (activeKey == 3) {
            getDebt();
        }
    }, [activeKey])
    return (
        <>
            <CustomTabs>
                <Col apn={24}>
                    <Row gutter={[8, 8]} justify={'end'}>
                        <Col span={24} style={{ fontSize: '2rem' }}>數據化圖表</Col>
                        <Col span={24}>
                            <Tabs
                                // onChange={onChange}
                                type="card"
                                onChange={key => setActivety(key)}
                                defaultActiveKey={1}
                                activeKey={activeKey}
                                items={[{
                                    key: 1,
                                    label: '全部',
                                    children: (<>
                                        <Col span={24}>
                                            <Row gutter={[16, 16]} justify={'center'} align={'middle'}>
                                                <Col span={24} style={{ fontSize: '2rem', textAlign: 'center' }}>1-12月欠還款情形</Col>
                                                <Col md={{ span: 12 }} sm={{ span: 24 }}>
                                                    <Row gutter={[8, 8]}>
                                                        <Col span={24}>
                                                            <DemoColumn data={data} />
                                                        </Col>
                                                        <Col span={24}>
                                                            <DemoLine data={data} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md={{ span: 12 }} sm={{ span: 24 }}>
                                                    <DemoPie data={data} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>),
                                }, {
                                    key: 2,
                                    label: '欠款資訊',
                                    children: (<>
                                        <Col span={24}>
                                            <Row gutter={[16, 16]} justify={'center'} align={'middle'}>
                                                <Col span={24} style={{ fontSize: '2rem', textAlign: 'center' }}>1-12月欠款情形</Col>
                                                <Col span={12}>
                                                    <Row gutter={[8, 8]}>
                                                        <Col span={24}>
                                                            <DemoColumn data={data_debt} />
                                                        </Col>
                                                        <Col span={24}>
                                                            <DemoLine data={data_debt} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col span={12}>
                                                    <DemoPie data={data_debt} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>),
                                }, {
                                    key: 3,
                                    label: '還款資訊',
                                    children: (<>
                                        <Col span={24}>
                                            <Row gutter={[16, 16]} justify={'center'} align={'middle'}>
                                                <Col span={24} style={{ fontSize: '2rem', textAlign: 'center' }}>1-12月還款情形</Col>
                                                <Col span={12}>
                                                    <Row gutter={[8, 8]}>
                                                        <Col span={24}>
                                                            <DemoColumn data={back_data} />
                                                        </Col>
                                                        <Col span={24}>
                                                            <DemoLine data={back_data} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col span={12}>
                                                    <DemoPie data={back_data} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>),
                                }]}
                            />
                        </Col>
                    </Row>

                </Col>
            </CustomTabs>
        </>
    )
}
export default Charts;
const DemoColumn = (props) => {
    let data = props.data;
    const config = {
        data,
        isGroup: true,
        xField: 'month',
        yField: 'amount',
        seriesField: 'vol',

        dodgePadding: 2,
        label: {
            position: 'middle',
            layout: [

                {
                    type: 'interval-adjust-position',
                },
                {
                    type: 'interval-hide-overlap',
                },
                {
                    type: 'adjust-color',
                },
            ],
        },
    };

    return <Column {...config} />;
};


const DemoPie = (props) => {

    let data = props.data;
    const config = {
        appendPadding: 10,
        data,
        angleField: 'amount',
        colorField: 'month',
        seriesField: 'vol',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'pie',
            offset: '-50%',
            
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: '',
            },
        },
    };
    return <Pie {...config} />;
};
const DemoLine = (props) => {
    let data = props.data;
    const config = {
        data,
        xField: 'month',
        yField: 'amount',
        seriesField: 'vol',
        legend: {
            position: 'top',
        },
        smooth: true,
        // @TODO 后续会换一种动画方式
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
    };
    return <Line {...config} />;
};