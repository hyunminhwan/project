import React, { useState } from 'react';
import axios from 'axios';

const Field = ({ label, type, name, value, onChange, placeholder, error }) => (
    <tr>
        <td>{label}</td>
        <td>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {error && <div style={{ fontSize: '0.8em', color: 'red' }}>{error}</div>}
        </td>
    </tr>
);

const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const SignupForm = () => {
    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        confirmPassword: '',
        name: '',
        gender: '',
        birthday: '',
        phone: '',
        email: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        let formErrors = {};
        const { userid, password, confirmPassword, name, gender, birthday, phone, email } = formData;

        if (!userid) formErrors.userid = 'ID를 입력하세요.';
        if (!password) formErrors.password = '비밀번호를 입력하세요.';
        if (password !== confirmPassword) formErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        if (!name) formErrors.name = '이름을 입력하세요.';
        if (!gender) formErrors.gender = '성별을 선택하세요.';
        if (!birthday) formErrors.birthday = '생년월일을 입력하세요.';
        else if (calculateAge(birthday) > 19) formErrors.birthday = '가입 가능한 나이 입니다.';
        else if (calculateAge(birthday) < 19) formErrors.birthday = '19세 이상만 가입할 수 있습니다.';
        if (!phone) formErrors.phone = '전화번호를 입력하세요.';
        // 이메일 정규식
        if (!email) formErrors.email = '이메일을 입력하세요.';
        else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = '유효한 이메일을 입력하세요.';

        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validate();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await axios.post('/mem/memberInsert', formData);
                alert('회원가입이 완료되었습니다.');
                setFormData({
                    userid: '',
                    password: '',
                    confirmPassword: '',
                    name: '',
                    email: '',
                    phone: '',
                    birthday: '',
                    gender: ''
                });
            } catch (error) {
                console.error('회원가입 오류:', error.response?.data || error.message);
                alert('회원가입에 실패했습니다.');
            }
        }
    };

    return (
        <div>
            <h1 align="center">회원가입</h1>
            <form onSubmit={handleSubmit}>
                <table align="center">
                    <tbody>
                        <Field
                            label="ID"
                            type="text"
                            name="userid"
                            value={formData.userid}
                            onChange={handleChange}
                            placeholder="아이디 입력"
                            error={errors.userid}
                        />
                        <Field
                            label="PWD"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호 입력"
                            error={errors.password}
                        />
                        <Field
                            label="PWD 확인"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="비밀번호 확인"
                            error={errors.confirmPassword}
                        />
                        <Field
                            label="NAME"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="이름 입력"
                            error={errors.name}
                        />
                        <Field
                            label="BIRTHDAY"
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            placeholder="2005-01-01"
                            error={errors.birthday}
                        />
                        <Field
                            label="EMAIL"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="이메일 입력"
                            error={errors.email}
                        />
                        <Field
                            label="PHONE"
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="010-0000-0000"
                            error={errors.phone}
                        />
                        <tr>
                            <td>GENDER</td>
                            <td>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                    />
                                    남
                                </label>
                                <label style={{ marginLeft: '5px' }}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleChange}
                                    />
                                    여
                                </label>
                                {errors.gender && <div style={{ fontSize: '0.8em', color: 'red' }}>{errors.gender}</div>}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ textAlign: 'center', marginTop: '5px' }}>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
