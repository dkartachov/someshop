import './Sidebar.css';
import Option from '../option/Option';

const Sidebar = ({ onSelect }) => {
    const sidebarOptions = [
        'products',
        'customers',
        'orders',
    ];

    return (
        <div className='sidebar'>
            {sidebarOptions.map((option, index) => (
                <Option key={index} text={option} onSelect={onSelect}/>
            ))}
        </div>
    );
}

export default Sidebar;