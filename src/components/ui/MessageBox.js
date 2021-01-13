import React from "react";
import PropTypes from 'prop-types';
import BasicCheckBox from '../formElements/BasicCheckBox';
import { Translation } from 'react-i18next';

const aegisStyle = {
    "A" : {'backgroundColor': '#f6d6d7', 'color': '#f74e4b'},
    "B" : {'backgroundColor': '#dbe7ff', 'color': '#4d7cfe'},
    "C" : {'backgroundColor': '#e1e2e7', 'color': '#a7a9b5'},
    "D" : {'backgroundColor': '#f9e9d0', 'color': '#dea846'},
    "E" : {'backgroundColor': '#9df2c2', 'color': '#20d06e'},
    "F" : {'backgroundColor': '#dbe7ff', 'color': '#4d7cfe'},
    "G" : {'backgroundColor': '#e1e2e7', 'color': '#a7a9b5'},
    "H" : {'backgroundColor': '#f9e9d0', 'color': '#dea846'},
    "I" : {'backgroundColor': '#dbe7ff', 'color': '#4d7cfe'},
    "J" : {'backgroundColor': '#e1e2e7', 'color': '#a7a9b5'},
    "K" : {'backgroundColor': '#f9e9d0', 'color': '#dea846'},
}


const MessageBox = (props) => {

 

  return(
     <ul className="message-list">
     {props.data.map((item, i) => {
        let getData = item.date;
        let date = new Date(getData);
        let dateString = getData.split(' ');
      return (
        <li key={i} className="flex pad-x-10 pad-y-20" data-id={item.id} onClick={props.click}>

      <div className="flex-item flex flex-middle flex-column">
       <div className={`aegis ${item.from.charAt(0).toUpperCase()}`} style={aegisStyle[item.from.charAt(0).toUpperCase()]}>
        {item.from.charAt(0).toUpperCase()}
       </div>
       <BasicCheckBox 
        containerClass="mtop10 checkbox-container"
        labelClass={item.id}
        id={`history_${item.historyId}`}
        value={item.id}
        name="message"
        checkmark="info"
       ></BasicCheckBox>
       </div>
       <div className="flex-item auto pad-x-10">
        <div className="flex flex-column">
          <div className="from-container flex-item">
            <p>
              <time dateTime={`${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`} className="f-right">
                {`${dateString[0]} ${dateString[1]} ${dateString[2]} ${dateString[3]}`}
              </time>
              {item.from.split('<')[0]}
            </p>
          </div>
          <div className="subject-container flex-item auto">
            <p className={`pointer ${item.labelIds.join(' ').toLowerCase()}`}>
             {item.subject}
            </p>
          </div>
          <div className="msg-preview-container flex-item">
            <p className="text-ellipsis">{item.snippet}</p>
          </div>
        </div>
       </div>
       <div className="felx-item message-actions">
        <p className="time text-right" title={`${dateString[0]} ${dateString[1]} ${dateString[2]} ${dateString[3]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}>
          {`${dateString[0]} ${dateString[1]} ${dateString[2]}`}
        </p>
        <p>
         <Translation>{(t, { i18n }) => <a href="/" title={t('Mark as read')}><i className="far fa-envelope"></i></a> }</Translation>
         <Translation>{(t, { i18n }) => <a href="/" title={t('Mark as starred')}><i className="far fa-star"></i></a> }</Translation>
         <Translation>{(t, { i18n }) => <a href="/" title={t('Mark as spam')}><i className="fas fa-exclamation-circle"></i></a> }</Translation>
         <Translation>{(t, { i18n }) => <a href="/" title={t('Move to trash')}><i className="fas fa-trash"></i></a> }</Translation>
        </p>
     
     </div>
     </li>
      )
      })}
      {props.pageToken &&
      <li className="pad-x-10 pad-y-20 text-center">
     
         <Translation>
           {(t, { i18n }) => <a href="/" 
            className="load-more-messages inline-block text-center tip-top info" 
            data-tip={t('Load more messages')}
            onClick={(e) => {
              e.preventDefault();
               props.loadMore(props.section, props.pageToken);
            }}
            >
            <i className="fas fa-plus"></i>
           </a> }
          </Translation>
               
      </li>
     }
    </ul>
);
  };

  MessageBox.protoTypes = {
    id: PropTypes.string.isRequired,
    internalDate: PropTypes.string,
    snippet: PropTypes.string,
    labelIds:PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired
}

export default MessageBox;