import java.sql.*;

public class connect {
    // JDBC driver name and database URL

    static final String JDBC_DRIVER = "org.mariadb.jdbc.Driver";
    static final String DB_URL = "jdbc:mariadb://218.166.0.56:3306/www";

    //  Database credentials
    static final String USER = "jk";
    static final String PASS = "jk123";

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        try {
            //STEP 2: Register JDBC driver
            Class.forName("org.mariadb.jdbc.Driver");

            //STEP 3: Open a connection
            System.out.println("Connecting to a selected database...");
            conn = DriverManager.getConnection(
                    "jdbc:mariadb://36.238.114.4:3306/www", "jk", "jk123");
            System.out.println("Connected database successfully...");

            //STEP 4: Execute a query
            System.out.println("Creating table in given database...");
            stmt = conn.createStatement();
            //String sql = "CREATE TABLE user ( id INT AUTO_INCREMENT,name varchar(50),email varchar(100),password varchar(50),PRIMARY KEY (id));";
            //String sql = "INSERT INTO user (name,email,password) values('jacky','410977004@mail.nknu.edu.tw','jky123')";
            //String sql = "CREATE TABLE friend ( id INT AUTO_INCREMENT,friend_id_1 int(50),friend_id_2 int(50),PRIMARY KEY (id));";
            //String sql = "INSERT INTO friend (friend_id_1,friend_id_2) values(1,2)";
            //String sql = "CREATE TABLE list ( id INT AUTO_INCREMENT,amount int(50),debt_date DATE,debt_note text(50),debt_user_id_1 int(50),debt_user_id_2 int(50),debt_alert boolean,repay_alert boolean, PRIMARY KEY (id));";
            //String sql = "INSERT INTO list (amount,debt_date,debt_note,debt_user_id_1,debt_user_id_2,debt_alert,repay_alert) values(300,'2023-05-25','seven',1,2,true,true)";
            String sql = "UPDATE list SET debt_note='麻辣燙' WHERE id=1;";
            stmt.execute(sql);
            
            String qry = "select * from list";
			Statement st = conn.createStatement();
			ResultSet rs = st.executeQuery(qry);
			while(rs.next()) {
				String lastName = rs.getString("amount");
				String firstName = rs.getString("debt_note");
				System.out.format("\t%2s%4s\n", lastName, firstName);
			}
            //System.out.println("Created table in given database...");
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            //finally block used to close resources
            try {
                if (stmt != null) {
                    conn.close();
                }
            } catch (SQLException se) {
            }// do nothing
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException se) {
                se.printStackTrace();
            }//end finally try
        }//end try
        System.out.println("Goodbye!");
    }//end main
}//end JDBCExample
