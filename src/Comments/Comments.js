import React, { useEffect, useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Deletemodal from "../Deletemodal/Deletemodal";
import Errorbox from '../Errorbox/Errorbox';
import { Form } from 'react-bootstrap';
import { ThemeContext  } from '../Context/ThemeContext';
import './Comments.css';

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowViewModal, setShowViewModal] = useState(false);
  const [isShowEditModal, setShowEditModal] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [commentID, setCommentID] = useState('');
  const [currentComment, setCurrentComment] = useState('');
  const [isAcceptModal, setAcceptModal] = useState(false);
  const [isRejectModal, setRejectModal] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    await fetch('http://localhost:8000/api/comments/')
      .then((res) => res.json())
      .then((comments) => {
        setAllComments(comments);
      });
  };

  const closeViewModal = () => setShowViewModal(false);
  const closeEditModal = () => setShowEditModal(false);
  const closeDeleteModal = () => setDeleteModal(false);
  const closeAcceptModal = () => setAcceptModal(false);
  const closeRejectModal = () => setRejectModal(false);

  const deleteComment = async () => {
    await fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        closeDeleteModal();
        getAllComments();
      })
  };

  const acceptComment = () => {
    fetch(`http://localhost:8000/api/comments/accept/${commentID}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then(() => {
        setAcceptModal(false);
        getAllComments();
      });
  };

  const rejectComment = () => {
    fetch(`http://localhost:8000/api/comments/reject/${commentID}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then(() => {
        setRejectModal(false);
        getAllComments();
      });
  };

  const commentChangeHandler = (e) => {
    setCurrentComment(e.target.value);
  };

  const saveNewComment = () => {
    const newBodyCm = {
      body: currentComment,
    };
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/JSON',
      },
      body: JSON.stringify(newBodyCm),
    })
      .then((res) => res.json())
      .then(() => {
        closeEditModal();
        getAllComments();
      });
  };

  return (
    <div className={`comments ${theme}`}>
      <h1 className="comment-title">لیست کامنت ها</h1>
      {allComments.length === 0 ? (
        <Errorbox />
      ) : (
        <div className={`comment-container ${theme}`}>
          <div className={`comment-table ${theme}`}>
            <table className="table">
              <thead>
                <tr>
                  <th>اسم کاربر</th>
                  <th>محصول</th>
                  <th>کامنت</th>
                  <th>تاریخ</th>
                  <th>ساعت</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {allComments.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.userID}</td>
                    <td>{comment.productID}</td>
                    <td>
                      <Button variant="outline-primary" className={`comment-table__btn ${theme}`} onClick={() => {
                          setCurrentComment(comment.body);
                          setShowViewModal(true);
                        }}
                      >دیدن کامنت</Button>
                    </td>
                    <td>{comment.date}</td>
                    <td>{comment.hour}</td>
                    <td className="comment-table__btns">
                      <Button variant="outline-primary" className={`comment-table__btn ${theme}`} onClick={() => {
                          setDeleteModal(true);
                          setCommentID(comment.id);
                        }}
                      > حذف </Button>
                      <Button variant="outline-primary" className={`comment-table__btn ${theme}`} onClick={() => {
                          setShowEditModal(true);
                          setCommentID(comment.id);
                          setCurrentComment(comment.body);
                        }}
                      > ویرایش </Button>

                      {comment.isAccept === 0 ? (
                        <Button variant="outline-primary" className={`comment-table__btn ${theme}`} onClick={() => {
                            setAcceptModal(true);
                            setCommentID(comment.id);
                          }}
                        > تائید کامنت </Button>
                      ) : (
                        <Button variant="outline-danger" className={`comment-table__btn ${theme}`} onClick={() => {
                            setRejectModal(true);
                            setCommentID(comment.id);
                          }}
                        > رد کامنت </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isShowViewModal && (
        <Modal show={true} centered onHide={closeViewModal}>
          <Modal.Body className={`comment-modal__body ${theme}`}>
            <Form className={`comment-modal__form ${theme}`}>
              <textarea className={`comment-modal__cm ${theme}`} value={currentComment} readOnly />
            </Form>
          </Modal.Body>
            <div className={`comment-modal__editBtns ${theme}`}>
              <Button className='comment-modal__closeBtn' variant="primary" onClick={closeViewModal} >بستن متن کامنت</Button>
            </div>
        </Modal>
      )}

      {isShowEditModal && (
        <Modal show={true} centered onHide={closeEditModal}>
          <Modal.Body className={`comment-modal__body ${theme}`}>
            <Form className={`comment-modal__form ${theme}`}>
              <textarea className={`comment-modal__cm ${theme}`} value={currentComment} onChange={commentChangeHandler} />
            </Form>
          </Modal.Body>
            <div className={`comment-modal__editBtns ${theme}`}>
              <Button variant="primary" onClick={saveNewComment} className='comment-modal__editBtn'>ثبت اطلاعات جدید</Button>
              <Button variant="secondary" onClick={closeEditModal} className='comment-modal__editBtn'>بستن متن کامنت</Button>
            </div>
        </Modal>
      )}

      {isDeleteModal && ( <Deletemodal title="آیا از حذف کامنت اطمینان دارید؟" onHide={closeDeleteModal} cancelAction={closeDeleteModal} submitAction={deleteComment}/>)}
      {isAcceptModal && ( <Deletemodal title="آیا از تائید کامنت اطمینان دارید؟" onHide={closeAcceptModal} cancelAction={closeAcceptModal} submitAction={acceptComment}/>)}
      {isRejectModal && ( <Deletemodal title="آیا از رد کامنت اطمینان دارید؟" onHide={closeRejectModal} cancelAction={closeRejectModal} submitAction={rejectComment}/>)}
    </div>
  );
}
