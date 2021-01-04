import React from "react";
import ReactDOM from "react-dom";

const DatalogQueryResult = ({
                          results,
                      }: {
    results: object;
}): JSX.Element => {
    return (
        <div>
            {JSON.stringify(results, null, 2)}
        </div>
    );
};

export const renderDatalogQueryResult = (
    results: object,
    container: HTMLElement
): void => ReactDOM.render(<DatalogQueryResult results={results} />, container);

export default DatalogQueryResult;
