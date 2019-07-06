import React, { Component, Fragment } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import styles from "./style";

import { Formik } from "formik";
import * as yup from "yup";

import Input from "components/Input";
import Button from "components/Button";

export default class Login extends Component {
  render() {
    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .required()
        .email()
        .label("Email"),
      password: yup
        .string()
        .required()
        .min(6)
        .label("Password")
    });

    return (
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <StatusBar barStyle="light-content" />
          <Image style={styles.logo} source={require("assets/logo.png")} />
          <Text style={styles.text}>💰</Text>
        </View>

        <Formik
          initialValues={{ name: "", password: "" }}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values));

            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);

            this.props.authStore.login(values.email, values.password);
          }}
          validationSchema={validationSchema}
        >
          {formik => (
            <Fragment>
              <Input
                label="Email"
                formikProps={formik}
                formikKey="email"
                placeholder="John@doe.com"
                autofocus
              />

              <Input
                label="Password"
                formikProps={formik}
                formikKey="password"
                placeholder="password"
                secureTextEntry
              />

              <Button
                title="Submit"
                onPress={formik.handleSubmit}
                disabled={formik.isSubmitting ? true : false}
              />
            </Fragment>
          )}
        </Formik>
      </View>
    );
  }
}
