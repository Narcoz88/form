import React from "react";
import {useSelector} from "react-redux";
import classes from './Table.module.scss'

const Table = () => {
    const {urlArr, data} = useSelector(store => store.form);
    return (
        <div className={classes.table} style={{gridTemplateColumns: `repeat(${urlArr.length}, 1fr)`}}>
            {data.length > 0 ? (
                data.map((item, index) => {
                    if (typeof item === 'number') {
                        return (
                            <div key={`${index}${item}`} className={classes.column}>
                                <p>result {index + 1}</p>
                                Ошибка {item}
                            </div>
                        )
                    } else if (typeof item === 'string') {
                        return (
                            <div key={`${index}${item}`} className={classes.column}>
                                <p>result {index + 1}</p>
                                Ошибка {item}
                            </div>
                        )
                    } else {
                        return (
                            <div key={`${index}${item.status}`} className={classes.column}>
                                <p>result {index + 1}</p>

                                {item.data?.map(subItem => {
                                    return (
                                        <div key={subItem.id}>
                                            {subItem.name}
                                            {subItem.title}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
                })
            ):(
                urlArr.map((item, index) => {
                    return (
                        <div key={index} className={classes.column}>
                            result {index + 1}
                        </div>
                    )
                })
            )}
        </div>
    )
};

export default Table;