export function InvestmentDecisionTool() {

    const numbers = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15]];

    return ( 
        <div>
            <h1> [Investment Decision Tool] </h1>
            <RenderTable numbers={numbers} />
        </div>
    );
}

function RenderTable(props) {
    
    var numbers = props.numbers;
    var rows = numbers.map((number, i) => {
        var entry = number.map((element, j) => {
            return (
                <td key={j}>{element}</td>
            );   
        });
        return (
            <tr key={i}>{entry}</tr>
        );  
    });
    
    return (
        <table>
            <tbody>
                {rows}    
            </tbody> 
        </table>
    );
}