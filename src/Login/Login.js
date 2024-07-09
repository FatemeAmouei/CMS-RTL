import React,{useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ThemeContext } from '../Context/ThemeContext';
import './Login.css'

export default function Login() {   
    const { theme, toggleTheme } = useContext(ThemeContext);

    const LoginAdmin = () => {
        console.log('LoginAdmin')
      }

    return (
        <div className={`login-container ${theme}`}>
            <div className={`login-content ${theme}`}>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalUsername">
                        <Form.Label column sm={2}> نام کاربری</Form.Label>
                        <Col sm={10}>
                            <Form.Control type='text' placeholder="نام کاربری خود را وارد کنید" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>رمزعبور</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="رمز عبور خود را وارد کنید" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 login-checkbox" controlId="formHorizontalCheck" >
                        <Col sm={{ span: 10, offset: 1 }}>
                            <Form.Check label="مرا بخاطر بسپار" />
                        </Col>
                    </Form.Group>

                    <Button variant="outline-primary" type="submit" className={`login-submit ${theme}`} 
                        onClick={LoginAdmin}
                    >ورود</Button>
                </Form>
            </div>
        </div>
    )
}