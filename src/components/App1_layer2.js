import React from 'react'
import Categories from './Categories';
import Navbar from './Navbar';
import Topbar from './Topbar';
import { Route, Routes } from 'react-router-dom';
import History from './History';
import Bookmarked from './Bookmarked';

//props takes darkmode toggle function, darkmode value, email
export default function App1_layer2(props) {
  return (
    <div className="container-fluid ">
      <div className="row flex-nowrap" style={{ width: '100%' }}>
        <div className={`col-2 px-sm-2 px-0 bg-${props.mode}`} style={{ width: '280px', borderRightStyle: props.mode === 'light' ? 'solid' : 'none' }}>
          {/* SIDE NAVBAR */}
          <Navbar toggle={props.toggleMode} mode={props.mode} loggedin={props.email} />
        </div>
        <div className="col-sm-12 py-3" style={{ paddingBottom: '0px', marginRight: '0px', paddingRight: '0px' }}>

          {/* ROUTES the route... changes TOPBAR and CATEGORIES... HISTORY...BOOKMARKED */}
          <Routes>
            <Route exact path='/' element={<>
              <div className="row" style={{ height: '45px', width: '100%' }}>
                <Topbar heading='Top Headlines' mode={props.mode} loggedin={props.email} />
              </div>
              <Categories key='home' category='general' loggedin={props.email} />
            </>
            } />
            <Route exact path='/business' element={<>
              <div className="row" style={{ height: '45px', width: '100%' }}>
                <Topbar heading='Business' mode={props.mode} loggedin={props.email} />
              </div>
              <Categories key='business' category='business' loggedin={props.email} />
            </>
            } />
            <Route exact path='/entertainment' element={<>
              <div className="row" style={{ height: '45px' }}>
                <Topbar heading='Entertainment' mode={props.mode} loggedin={props.email} />
              </div>
              <Categories key='entertainment' category='entertainment' loggedin={props.email} />
            </>
            } />


            <Route exact path='/science' element={<>
              <div className="row" style={{ height: '45px' }}>
                <Topbar heading='Science' mode={props.mode} loggedin={props.email} />
              </div>
              <Categories key='science' category='science' loggedin={props.email} />
            </>
            } />
            <Route exact path='/general' element={<>
              <div className="row" style={{ height: '45px' }}>
                <Topbar heading='General' mode={props.mode} loggedin={props.email} />
              </div>
              <Categories key='general' category='general' loggedin={props.email} />
            </>
            } />
            <Route exact path='/sports' element={<>
              <div className="row" style={{ height: '45px' }}>
                <Topbar heading='Sports' mode={props.mode} loggedin={props.email} />
              </div>
              <Categories key='sports' category='sports' loggedin={props.email} />
            </>
            } />
            <Route exact path='/health' element={<>
              <div className="row" style={{ height: '45px' }}>
                <Topbar heading='Health' mode={props.mode} loggedin={props.email} />
              </div>
              <Categories key='health' category='health' loggedin={props.email} />
            </>
            } />
            <Route exact path='/technology' element={<>
              <div className="row" style={{ height: '45px' }}>
                <Topbar heading='Technology' mode={props.mode} loggedin={props.email} />
              </div>
              <Categories key='technology' category='technology' loggedin={props.email} />
            </>
            } />

            <Route exact path='/history' element={
              <>
                <div className="row" style={{ height: '45px' }}>
                  <Topbar heading='History' mode={props.mode} loggedin={props.email} />
                </div>
                <History />
              </>
            } />
            <Route exact path='/bookmarked' element={
              <>
                <div className="row" style={{ height: '45px' }}>
                  <Topbar heading='Bookmarkered' mode={props.mode} loggedin={props.email} />
                </div>
                <Bookmarked loggedin={props.email} />
              </>
            } />

          </Routes>
        </div>
      </div>
    </div>
  )
}
