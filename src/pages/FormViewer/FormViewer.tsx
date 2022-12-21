import React, {
    useEffect
} from "react";
import {
    FormEditor
} from '@bpmn-io/form-js-editor';
import Button from '@mui/material/Button';

import "./style/dragula.css";
import "./style/form-js-editor.css";
import "./style/form-js.css";
import "./style/light.css";
import "./style/properties-panel.css";


export const FormViewer = (): JSX.Element => {
    var formEditor;
    const schema = {
        schemaVersion: 3,
        exporter: {
          name: "form-js (https://demo.bpmn.io)",
          version: "0.3.0"
        },
        components: [
          {
            key: "name",
            label: "Text Field",
            type: "textfield",
            id: "Field_1jfqw1v",
            description: "Enter your name ...",
            validate: {
              required: true,
              minLength: 3,
              maxLength: 50
            }
          }
        ],
        type: "default",
        id: "Form_1f88rws"
      }

    useEffect(() => {
        formEditor = new FormEditor({
            container: document.querySelector('#form-editor')
        })
        formEditor.importSchema(schema)
    }, [])

    const save = async () => {
        console.log('save');
        const schema = formEditor.saveSchema();
        console.log(schema);
      }

    return ( 
        <div style={{ height: "100%" }}>
            <div id="form-editor"/>
            <Button onClick={save}>save!</Button>
        </div>
    );
}

export default FormViewer;