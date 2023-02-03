import React from "react";
import classes from "./FormComp.module.scss";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";

const FormComp = () => {
    const dispatch = useDispatch();
    const {urlArr} = useSelector(store => store.form);
    const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    const newObj = {};
    const validObj = {};

    urlArr.forEach((item => {
        newObj[item.name] = '';
        validObj[item.name] = yup.string().matches(URL, 'Введите корректный url!').required("Введите url");
    }));
    const validationsSchema = yup.object().shape({...validObj});
    const handleAdd = () => {
        if (urlArr.length < 10) {
            dispatch({type: 'ADD_ITEM_FORM'});
        }
    };
    const handleRemove = () => {
        if (urlArr.length > 1) {
            dispatch({type: 'REMOVE_ITEM_FORM'});
        }
        dispatch({type: 'REMOVE_ITEM_DATA_FORM'});
    };

    return (
        <div>
            <Formik enableReinitialize={true}
                    initialValues={{...newObj}}
                    validateOnBlur
                    onSubmit={(values, {resetForm}) => {
                        dispatch({type: 'SEND_FORM', payload: values});
                        resetForm();
                    }}
                    validationSchema={validationsSchema}
            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) =>
                    (
                        <Form>
                            {urlArr.map((item) => {
                                return (
                                    <div key={item.name}>
                                        <Field
                                            type="text"
                                            name={item.name}
                                            placeholder={item.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        {(touched[item.name] && errors[item.name]) && (
                                            <div className={classes.error}>
                                                {touched[item.name] && errors[item.name] && <span>{errors[item.name]}</span>}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                            <button type="button" onClick={handleAdd}>Добавить</button>
                            <button type="button" onClick={handleRemove}>Удалить</button>
                            <button type="submit" disabled={!isValid || !dirty}>Отправить</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
};


export default FormComp;