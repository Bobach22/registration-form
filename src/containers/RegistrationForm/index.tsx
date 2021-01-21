import {
  Button,
  FormFields,
  FormLabel,
  FormError,
  Input,
  Checkbox,
  Dropdown,
  FormTitle,
  Block,
} from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { MouseEvent } from "react";
import styles from "./style.module.scss";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Поле не может быть пустым")
    .matches(/^[A-Za-z -]+$/i, {
      message:
        "поле “Имя” не может содержать цифры и символы кроме пробела и дефиса",
    }),
  email: yup
    .string()
    .required("Поле не может быть пустым")
    .matches(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      { message: "Введено не корректное значение" }
    ),
  phone: yup
    .string()
    .required("Поле не может быть пустым")
    .matches(
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm,
      {
        message:
          "Можно ввести только 11 цифр, круглые скобки, дефис и знак плюс",
      }
    ),
  language: yup.string().required("Поле не может быть пустым"),
  accepted: yup.boolean().required(),
});

type TProps = {
  name: string;
  email: string;
  phone: string;
  language: string;
  accepted: boolean;
};

type TSubmit<T> = (data: T) => T;

const languageOptions = [
  { label: "Русский", value: "russian" },
  { label: "Английский", value: "english" },
  { label: "Испанский", value: "spanish" },
  { label: "Китайский", value: "chinese" },
];

const RegistrationForm: React.FC<any> = (props) => {
  const [checked, setChecked] = React.useState(false);
  const [language, setLanguage] = React.useState("");

  const { register, handleSubmit, errors, setValue} = useForm({
    resolver: yupResolver(schema),
  });
   
  React.useEffect(() => {
    register("accepted");
    register("language");
  }, [register, checked,language]);

   

  const handleLanguage = (language: { label: string; value: any }) => {
    const { value } = language;
    setValue("language", value);
    setLanguage(value);
  };

  const handleAccepted = (e:MouseEvent<HTMLInputElement>) => {
        setValue("accepted", e.currentTarget.checked);
    setChecked(!checked);
  };

  const onSubmit: TSubmit<TProps> = (data) => {
    const formData = {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      accepted: data?.accepted,
      language: data?.language,
    };
    console.log(formData);
    return formData;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormTitle>Регистрация</FormTitle>
      <Block className={styles.hints__block}>
        {" "}
        <Block className={styles.question}>Уже есть аккаунт?</Block>
        <a className={styles.sign__in} href="#signin">
          Войти
        </a>
      </Block>

      <FormFields>
        <FormLabel>Имя</FormLabel>
        <Input
          name="name"
          type="text"
          placeholder="Введите Ваше имя"
          ref={register}
        />
        {errors.name && <FormError>{errors.name?.message}</FormError>}
      </FormFields>
      <FormFields>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="Введите ваш email"
          ref={register}
        />
        {errors.email && <FormError>{errors.email?.message}</FormError>}
      </FormFields>
      <FormFields>
        <FormLabel>Номер телефона</FormLabel>
        <Input
          name="phone"
          type="text"
          placeholder="Введите номер телефона"
          ref={register}
        />
        {errors.phone && <FormError>{errors.phone?.message}</FormError>}
      </FormFields>
      <FormFields>
        <FormLabel>Язык</FormLabel>
        <Dropdown
          options={languageOptions}
          value={language}
          onChange={handleLanguage}
          placeholder="Язык"
        />
        {errors.language && <FormError>{errors.language?.message}</FormError>}
      </FormFields>

      <FormFields>
        <Checkbox checked={checked} onClick={handleAccepted}>
          Принимаю{" "}
          <a href="#terms" className={styles.terms__link}>
            условия
          </a>{" "}
          использования
        </Checkbox>
      </FormFields>

      <Button
        style={{ marginTop: "16px" }}
        onClick={() => console.log(errors)}
        disabled={!checked}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default RegistrationForm;
