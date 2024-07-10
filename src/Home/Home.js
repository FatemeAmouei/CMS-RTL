import React, { useEffect ,useState, useContext} from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,RadialBarChart ,RadialBar,Legend} from 'recharts';
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import Button from 'react-bootstrap/Button';
import { ThemeContext  } from '../Context/ThemeContext';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Errorbox from '../Errorbox/Errorbox';
import './Home.css';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page H',
    uv: 4750,
    pv: 4300,
    amt: 2000,
  },
  {
    name: 'Page J',
    uv: 3800,
    pv: 4000,
    amt: 2100,
  },
  {
    name: 'Page K',
    uv: 4200,
    pv: 4300,
    amt: 2100,
  },
];

const datas = [
  {
    name: '18-24',
    uv: 31.47,
    pv: 2400,
    fill: '#8884d8',
  },
  {
    name: '25-29',
    uv: 26.69,
    pv: 4567,
    fill: '#83a6ed',
  },
  {
    name: '30-34',
    uv: 15.69,
    pv: 1398,
    fill: '#8dd1e1',
  },
  {
    name: '35-39',
    uv: 8.22,
    pv: 9800,
    fill: '#82ca9d',
  },
  {
    name: '40-49',
    uv: 8.63,
    pv: 3908,
    fill: '#a4de6c',
  },
  {
    name: '50+',
    uv: 2.63,
    pv: 4800,
    fill: '#d0ed57',
  },
  {
    name: 'unknow',
    uv: 6.67,
    pv: 4800,
    fill: '#ffc658',
  },
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

export default function Home(){
  const [allComments ,setAllComments] = useState([])
  const [notAcceptCm ,setnotAcceptCm] = useState([])
  const [IsshowCMmodal ,setShowCMmodal] = useState(false)
  const [currentComment, setCurrentComment] = useState({});
  const { theme } = useContext(ThemeContext);

  useEffect(()=>{
    getAllComments()

  },[])

  const getAllComments =() => {
    fetch('http://localhost:8000/api/comments/')
    .then(res => res.json())
    .then(comments => {
      setAllComments(comments)
      setnotAcceptCm(comments.filter(comment => comment.isAccept === 0))
      console.log(notAcceptCm)
    })
  }

  const CloseCMModal =()=>{
    setShowCMmodal(false)
  }

   return (
    <div className={`home-container ${theme}`}>
      <div className='home-container__top'>
        <div className="home-container__top-right">
          <Calendar
            calendar={persian}
            locale={persian_fa}
            className={`calender ${theme}`}
            />
        </div>

        <div className={`home-container__top-center ${theme}`}> 
          <h2 className="home-title">بازدید</h2>
          <ResponsiveContainer width="100%" height="80%" >
            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={datas}>
              <RadialBar
                minAngle={15}
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                clockWise
                dataKey="uv"
              />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="home-container__top-left">
          <div className={`home-comment ${theme}`}>
            <h2 className="home-title">کامنت جدید</h2>
            {notAcceptCm.length === 0 ? (
              <Errorbox />
              ) : (
                <table className='home-comment__table'>
                  <thead>
                    <tr>
                      <th>اسم کاربر</th>
                      <th>محصول</th>
                      <th>کامنت</th>
                      <td>وضعیت</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      notAcceptCm.map(comment => (
                        <tr key={comment.id}>
                        <td>{comment.userID}</td>
                        <td>{comment.productID}</td>
                        <td>
                          <Button variant="outline-primary" className={`comment-table__btn ${theme}`}
                            onClick={()=>{
                              setShowCMmodal(true)
                              setCurrentComment(comment.body)
                            }}>دیدن کامنت</Button>
                        </td>
                        <td style={{color:'red'}}>تائید نشده</td>
                      </tr>
                      ))
                    }
                  </tbody>
                </table>
              )}
          </div>
        </div>
      </div>
      <div className="home-container__bottom">
        <div className={`home-container__bottom-right ${theme}`}> 
          <h2 className="home-title">لورم</h2>
          <p className="home-text">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، .</p>
        </div>
        <div className={`home-container__bottom-left ${theme}`}>
          <h2 className="home-title">آمار</h2>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart
              data={data}
              margin={{
                top: 0,
                right: 30,
                left: 0,
                bottom: 1,
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {IsshowCMmodal && 
        <Modal show={true} centered onHide={CloseCMModal}>
          <Modal.Body className={`comment-modal__body ${theme}`}>
            <Form className={`comment-modal__form ${theme}`}>
              <textarea className={`comment-modal__cm ${theme}`} value={currentComment}  />
            </Form>
          </Modal.Body>
            <div className={`comment-modal__editBtns ${theme}`}>
              <Button variant="primary" className='comment-modal__closeBtn' onClick={CloseCMModal}>بستن متن کامنت</Button>
            </div>
        </Modal>
      }
      </div>
   );
}
