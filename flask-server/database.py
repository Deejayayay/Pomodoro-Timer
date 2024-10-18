from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, CHAR
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Person(Base):
    #create the name for the table
    __tablename__ = "people"

    #attributes declaration
    ssn = Column("ssn", Integer, primary_key=True)
    firstName = Column("firstname", String)
    lastName = Column("lastname", String)
    gender = Column("gender", CHAR)
    age = Column("age", Integer)

    #constructor which says that we can pass all these things right away
    def __init__(self, ssn, first, last, gender, age):
        self.ssn = ssn
        self.firstName = first
        self.lastName = last
        self.gender = gender
        self.age = age

    #a function that allows us to specify how we want to print a person
    def __repr__(self):
        return f"({self.ssn}) {self.firstName} {self.lastName} ({self.gender},{self.age})"

#creates a connection to your database 
                        #creates a relative in memory database 
engine = create_engine("sqlite:///mydb.db", echo=True, pool_pre_ping=True)
engine.execute("DROP TABLE IF EXISTS people")
#takes all the classes that extand from base and connects them to the data base
#creates the tables 
Base.metadata.create_all(bind=engine)

#just a session
Session = sessionmaker(bind=engine)
session = Session()

person = Person(12123, "jacob", "smith", "f", 5)
session.add(person)
session.commit()

p1 = Person(313123, "Hope", "popppy", "m", 36)
p2 = Person(3123, "pope", "popppy", "f", 26)
p3 = Person(3113, "slope", "popppy", "f", 16)

session.add(p1)
session.add(p2)
session.add(p3)
session.commit()