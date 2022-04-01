import React, { useState } from 'react';

function CodeEditor() {

    const [code, setCode] = useState({
        data: ` var Singleton = (function() {
            var privateVariable = "…";
                            this.publicMethod = function()    {…};
                            function privateMethod() {…};
            })();`
    })

    const writeCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode((prev) => ({
            ...prev,
            data: e.target.value
        }))
    }
    return (
        <textarea onChange={writeCode} value={code.data} className='editor' />
    )
}

export default React.memo(CodeEditor)