import { useState } from 'react';
import useFetch from 'use-http';
import StoreViewUI from 'components/ui/Store/StoreView';

const StoreView = ({ isOpen, id }) => {
    const [value, setValue] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [decryptedStore, setDecryptedStore] = useState(false);
    const handleChange = (event) => setValue(event.target.value);
    const { post, response, loading } = useFetch(`/${id}`);
    let outputData = undefined;

    const submit = async () => {
        if (!value) {
            return setIsInvalid(true);
        }

        const data = await post({
            key: value,
        });

        if (!response.ok) {
            return setIsInvalid(true);
        }

        // TODO: manage if key invalid

        outputData = JSON.stringify(await data.data, null, 2);
        console.log(outputData);
    };

    return (
        <StoreViewUI
            id={id}
            storeKey={value}
            isOpen={isOpen}
            decryptedStore={outputData}
            valueInput={value}
            onChangeInput={handleChange}
            isInvalidInput={isInvalid}
            isLoadingSubmit={loading}
            onClickSubmit={submit}
        />
    );
};

export default StoreView;
