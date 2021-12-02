import { Link, Outlet } from 'react-router-dom';

export function ProjectsHeader() {

    return ( 
        <div className = "content-wrap">
            <h1> Current Projects </h1>
            <nav className="projects-nav" id="projects-nav">
                <Link to="investmentDecisionTool">Investment Decision Tool</Link>
                <Link to="loanCalculator">Loan Calculator</Link>
            </nav>
            <Outlet />
        </div>
    );
}