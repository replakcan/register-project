import axios from "axios";
import { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button, CardBody, Card, CardHeader, FormFeedback, CardFooter } from "reactstrap";


const initialValues = {
    ad: "",
    soyad: "",
    email: "",
    password: "",
};

const initialErrors = {
    ad: false,
    soyad: false,
    email: false,
    password: false,
}

const errorMessages = {
    ad: "Adınızı en az 3 karakter giriniz.",
    soyad: "Soyadınızı en az 3 karakter giriniz.",
    email: "Geçerli bir email adresi giriniz.",
    password: "En az 8 karakter, en az 1 büyük harf, en az 1 küçük harf, en az 1 sembol ve en az 1 rakam içermelidir.",
}



export default function Register() {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setIsValid] = useState(false);
    const [id, setId] = useState("");


    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;


    useEffect(() => {
        if (formData.ad.trim().length >= 3 && formData.soyad.trim().length >= 3 && validateEmail(formData.email) && regex.test(formData.password)) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [formData])


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value})

        if (name === "ad" || name === "soyad") {
            if (value.trim().length >= 3) {
                setErrors({...errors, [name]: false})
            } else {
                setErrors({...errors, [name]: true})
            }
        }

        if (name === "email") {
            if (validateEmail(value)){
                setErrors({...errors, [name]: false})
            } else {
                setErrors({...errors, [name]: true})
            }
        }

        if (name === "password") {
            if (regex.test(value)) {
                setErrors({...errors, [name]: false})
            } else {
                setErrors({...errors, [name]: true})
            }
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) return

        axios.post("https://reqres.in/api/users", formData).then((res) => {
            console.log(res)
            setFormData(initialValues)
            setId(res.data.id)
        }).catch((error) => {
            console.warn(error)
        })
    }
    return (
    
<Card>
    <CardHeader>
        Kayıt Ol
    </CardHeader>
    <CardBody>
    <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="ad">
            Ad:
          </Label>
          <Input
            id="ad"
            name="ad"
            placeholder="Adınızı giriniz"
            type="text"
            value={formData.ad}
            onChange={handleChange}
            invalid={errors.ad}
          />
          {errors.ad && <FormFeedback>{errorMessages.ad}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="soyad">
            Soyad:
          </Label>
          <Input
            id="soyad"
            name="soyad"
            placeholder="Soyadınızı giriniz"
            type="text"
            value={formData.soyad}
            onChange={handleChange}
            invalid={errors.soyad}
          />
        {errors.soyad && <FormFeedback>{errorMessages.soyad}</FormFeedback>}

        </FormGroup>
        <FormGroup>
          <Label for="Email">
            Email:
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="Kurumsal adresinizi giriniz"
            type="email"
            value={formData.email}
            onChange={handleChange}
            invalid={errors.email}
          />
            {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="password">
            Password:
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="Güçlü bir password seçiniz"
            type="password"
            value={formData.password}
            onChange={handleChange}
            invalid={errors.password}
          />
            {errors.password && <FormFeedback>{errorMessages.password}</FormFeedback>}
        </FormGroup>
        <Button disabled={!isValid}>
          Kayıt Ol
        </Button>
      </Form>
    </CardBody>
    <CardFooter>
        ID: {id}
    </CardFooter>
</Card>
      );
}