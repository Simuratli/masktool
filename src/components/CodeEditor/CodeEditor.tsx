import React, { useState } from 'react';

function CodeEditor() {

    const [code, setCode] = useState(` var Singleton = (function() {
        var privateVariable = "…";
                        this.publicMethod = function()    {…};
                        function privateMethod() {…};
        })();`)

    return (
        <textarea className='editor'>
           {code}
        </textarea>
    )
}

export default React.memo(CodeEditor)