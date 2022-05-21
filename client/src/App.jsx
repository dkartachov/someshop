import { useState, useEffect } from "react";
import Banner from "./components/banner/Banner";
import Sidebar from "./components/sidebar/Sidebar";
import ListView from "./components/listview/ListView";
import { all } from "./utils/api";
import AddModal from "./components/addmodal/AddModal";
import { Snackbar, Alert } from "@mui/material";

function App() {
  const [module, setModule] = useState('products');
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const delayLoading = setTimeout(() => {
      setLoading(true);
    }, 500);

    all(module)
    .then(data => setData(data))
    .catch(e => {
      setData([]);
    })
    .finally(() => {
      clearTimeout(delayLoading);
      setLoading(false);
      setFetching(false);
    });

  }, [module]);

  const refresh = async () => {
    const data = await all(module);

    setData(data);
  }

  const onSelect = (option) => {
    if (module !== option && !fetching) {
      setFetching(true);
      setModule(option);
    }
  }

  const onCloseAddModal = () => {
    setShowAddModal(false);
    refresh();
  }

  const onCloseSuccessSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setSuccess(false);
  }

  const main = () => {
    return (
      <>
        {
          <ListView module={module} records={data} fetching={fetching} loading={loading} onClickAdd={() => setShowAddModal(true)} onClickRecord={false}/>
        }
      </>
    );
  }

  return (
    <>
      <Sidebar onSelect={onSelect}/>
      <div className="main">
        <Banner />
        {main()}
        <AddModal open={showAddModal} close={onCloseAddModal} save={() => setSuccess(true)} module={module} />
        <Snackbar 
          open={success} 
          autoHideDuration={1500} 
          onClose={onCloseSuccessSnackbar}
          anchorOrigin={{
            horizontal:'center',
            vertical:'top',
          }}
        >
          <Alert 
            onClose={onCloseSuccessSnackbar} 
            severity='success'
            variant='filled'
          >
            {`${module.slice(0, -1)} created!`}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default App;
