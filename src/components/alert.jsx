import { useState, useEffect } from 'react';
import { Helper } from '../services/helper.js';

export function Alert({alerts, closeAlert}) {
  useEffect(() => {
    const timerId = setTimeout(() => {
      closeAlert();
    }, 800);

    return () => {
      clearTimeout(timerId);
    };
  }, [alerts]);

  return (
    <div className="alert-container">
      {alerts.map((item, index) => {
        const classAlert = index === alerts.length - 1 ? 'alert alert--active' : 'alert';
        return <div className={classAlert} key={Helper.random(1, 1000)}>{item} добавлен в корзину</div>}
      )}
    </div>
  );
}