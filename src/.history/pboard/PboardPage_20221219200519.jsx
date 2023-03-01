import React from 'react'
import { Route } from 'reactrouterdom'
import pboardInsert from './PboardInsert'
import pboardList from './PboardList'
import pboardRead from './PboardRead'

const PboardPage = () => {
  return (
    <div>
      <Route path="/pboard/list" component={pboardList} />
      <Route path="/pboard/read/:pcode" component={pboardRead} />
      <Route path="/pboard/insert/:unickname" component={pboardInsert} />
    </div>
  )
}



	<bean id="dataSource"
	    class="org.springframework.jdbc.datasource.DriverManagerDataSource">
	    <property name="driverClassName" value="net.sf.log4jdbc.sql.jdbcapi.DriverSpy"></property>
	    <property name="url" value="jdbc:log4jdbc:mysql://112.218.158.250:3306/team2db" />
	    <property name="username" value="team2" />
	    <property name="password" value="pass" />
	  </bean>




export default PboardPage