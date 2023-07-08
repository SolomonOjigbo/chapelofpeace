"use strict";

var _sequelize$define;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var _require2 = require("../config"),
    db_name = _require2.db_name,
    db_password = _require2.db_password,
    db_username = _require2.db_username,
    db_host = _require2.db_host,
    user_default_image = _require2.user_default_image; // Option 3: Passing parameters separately (other dialects)


var sequelize = new Sequelize(db_name, db_username, db_password, {
  host: db_host,
  dialect: "mysql"
  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */

});
var UserModel = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING,
    defaultValue: user_default_image
  }
});
var UnitModel = sequelize.define("unit", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  name: DataTypes.STRING,
  url: DataTypes.STRING
});
var PostModel = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  name: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  content: {
    type: DataTypes.STRING
  },
  photo: {
    type: DataTypes.STRING
  }
});
var ServiceModel = sequelize.define("service", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  content: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING
  }
});
var PartnersModel = sequelize.define("partners", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  content: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING
  }
});
var ContactUsModel = sequelize.define("contact", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  subject: DataTypes.STRING,
  content: DataTypes.STRING
});
var DonationModel = sequelize.define("donation", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone_no: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  purpose: DataTypes.STRING,
  gateway: DataTypes.STRING,
  details: DataTypes.STRING
});
var MembershipModel = sequelize.define("membership", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  name: DataTypes.STRING,
  sex: DataTypes.STRING,
  marital_status: DataTypes.STRING,
  no_of_children: DataTypes.FLOAT,
  date_of_birth: DataTypes.STRING,
  country: DataTypes.STRING,
  state: DataTypes.STRING,
  city: DataTypes.STRING,
  email: DataTypes.STRING,
  phone_no: DataTypes.STRING,
  type_of_membership: DataTypes.STRING,
  department: DataTypes.STRING,
  level: DataTypes.STRING,
  permanent_address: DataTypes.STRING,
  contact_address: DataTypes.STRING,
  residential_address: DataTypes.STRING,
  next_of_kin_name: DataTypes.STRING,
  next_of_kin_phone_no: DataTypes.STRING,
  next_of_kin_address: DataTypes.STRING,
  born_again: DataTypes.STRING,
  baptized: DataTypes.STRING,
  baptism_method: DataTypes.STRING,
  holy_ghost_baptism: DataTypes.STRING,
  speaking_in_tongues: DataTypes.STRING,
  service_unit: DataTypes.STRING,
  content: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING
  }
});
var ResponseModel = sequelize.define("response", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  name: DataTypes.STRING,
  sex: DataTypes.STRING,
  marital_status: DataTypes.STRING,
  phone_no: DataTypes.STRING,
  status: DataTypes.STRING,
  department: DataTypes.STRING,
  level: DataTypes.STRING,
  hostel_name: DataTypes.STRING,
  room_number: DataTypes.STRING,
  residential_address: DataTypes.STRING,
  reason: DataTypes.STRING,
  prayer_point: DataTypes.STRING
});
var BibleStudyModel = sequelize.define("biblestudy", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING
  }
});
var BibleStudyScheduleModel = sequelize.define("biblestudyschedule", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  date: DataTypes.STRING,
  time: DataTypes.STRING,
  venue: DataTypes.STRING,
  zoom_link: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING
  },
  bulletin: {
    type: DataTypes.STRING
  }
});
var PrayerRequestsModel = sequelize.define("prayerrequests", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  name: DataTypes.STRING,
  phone_no: DataTypes.STRING,
  email: DataTypes.STRING,
  content: DataTypes.STRING
});
var PrayerMeetingBulletinModel = sequelize.define("prayermeetingbulletin", (_sequelize$define = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  date: DataTypes.STRING,
  time: DataTypes.STRING,
  venue: DataTypes.STRING
}, _defineProperty(_sequelize$define, "venue", DataTypes.STRING), _defineProperty(_sequelize$define, "zoom_link", DataTypes.STRING), _defineProperty(_sequelize$define, "photo", {
  type: DataTypes.STRING
}), _sequelize$define));
var MeditationModel = sequelize.define("meditation", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  date: DataTypes.STRING,
  time: DataTypes.STRING,
  venue: DataTypes.STRING,
  content: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING
  }
});
var SliderModel = sequelize.define("slider", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  photo: DataTypes.STRING,
  description: DataTypes.STRING,
  title: DataTypes.STRING,
  page: DataTypes.STRING
});
var BibleStoriesModel = sequelize.define("biblestories", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING
  }
});
var ChildrenSongsModel = sequelize.define("childrensongs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  url: DataTypes.STRING
});
var MemoryVerseModel = sequelize.define("memoryverse", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  url: DataTypes.STRING
});
var AlumniAnnouncementModel = sequelize.define("alumniannouncement", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING
});
var TestimonialsModel = sequelize.define("testimonials", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  url: DataTypes.STRING,
  name: DataTypes.STRING
});
var AlumniMembershipModel = sequelize.define("alumnimembership", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  name: DataTypes.STRING,
  sex: DataTypes.STRING,
  marital_status: DataTypes.STRING,
  no_of_children: DataTypes.FLOAT,
  date_of_birth: DataTypes.STRING,
  country: DataTypes.STRING,
  state: DataTypes.STRING,
  city: DataTypes.STRING,
  email: DataTypes.STRING,
  phone_no: DataTypes.STRING,
  contact_address: DataTypes.STRING,
  residential_address: DataTypes.STRING,
  type_of_membership: DataTypes.STRING,
  department: DataTypes.STRING,
  faculty: DataTypes.STRING,
  permanent_address: DataTypes.STRING,
  year_of_graduation: DataTypes.STRING,
  service_unit: DataTypes.STRING,
  content: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING
  }
});
var MembersOfCouncilModel = sequelize.define("membersofcouncil", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  name: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING
  },
  facebook: DataTypes.STRING,
  instagram: DataTypes.STRING,
  linkedin: DataTypes.STRING,
  twitter: DataTypes.STRING
});
var BoardOfTrusteeModel = sequelize.define("boardoftrustee", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  name: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING
  },
  facebook: DataTypes.STRING,
  instagram: DataTypes.STRING,
  linkedin: DataTypes.STRING,
  twitter: DataTypes.STRING
});
var LiveStreamingModel = sequelize.define("livestreaming", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  link: DataTypes.STRING
});
var EventsModel = sequelize.define("events", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING
  }
});
var ChildrenStoriesModel = sequelize.define("childrenstories", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  author: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING
  }
}); //Creating relationships
// //User -> unit relationship
// UserModel.hasOne(UnitModel);
// UnitModel.belongsTo(UserModel);
// //Post -> user relationship
// UserModel.hasMany(PostModel);
// PostModel.belongsTo(UserModel, {
// 	through: "UserPost",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //Service -> user relationship
// UserModel.hasMany(ServiceModel);
// ServiceModel.belongsTo(UserModel, {
// 	through: "UserService",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //Bible Study -> user relationship
// UserModel.hasMany(BibleStudyModel);
// BibleStudyModel.belongsTo(UserModel, {
// 	through: "UserBibleStudy",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //Bible Study Schedule -> user relationship
// UserModel.hasMany(BibleStudyScheduleModel);
// BibleStudyScheduleModel.belongsTo(UserModel, {
// 	through: "UserBibleSchedule",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //Prayer Bulletin -> user relationship
// UserModel.hasMany(PrayerMeetingBulletinModel);
// PrayerMeetingBulletinModel.belongsTo(UserModel, {
// 	through: "UserPrayerMeetingBulletin",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //Meditation -> user relationship
// UserModel.hasOne(MeditationModel);
// MeditationModel.belongsTo(UserModel);
// //Slider -> user relationship
// UserModel.hasMany(SliderModel);
// SliderModel.belongsTo(UserModel, {
// 	through: "UserSlider",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //Bible Stories -> user relationship
// UserModel.hasMany(BibleStoriesModel);
// BibleStoriesModel.belongsTo(UserModel, {
// 	through: "UserBibleStories",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //Children Songs -> user relationship
// UserModel.hasMany(ChildrenSongsModel);
// ChildrenSongsModel.belongsTo(UserModel, {
// 	through: "UserChildrenSongs",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //Memory Verse -> user relationship
// UserModel.hasMany(MemoryVerseModel);
// MemoryVerseModel.belongsTo(UserModel, {
// 	through: "UserMemoryVerse",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //AlumniAnnouncement -> user relationship
// UserModel.hasMany(AlumniAnnouncementModel);
// AlumniAnnouncementModel.belongsTo(UserModel, {
// 	through: "UserAlumniAnnouncement",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //Testimonial -> user relationship
// UserModel.hasMany(TestimonialsModel);
// TestimonialsModel.belongsTo(UserModel, {
// 	through: "UserTestimonial",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //Members of council -> user relationship
// UserModel.hasMany(MembersOfCouncilModel);
// MembersOfCouncilModel.belongsTo(UserModel, {
// 	through: "UserMembersOfCouncil",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //Live Streaming -> user relationship
// UserModel.hasMany(LiveStreamingModel);
// LiveStreamingModel.belongsTo(UserModel, {
// 	through: "UserLiveStreaming",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //Events -> user relationship
// UserModel.hasMany(EventsModel);
// EventsModel.belongsTo(UserModel, {
// 	through: "UserEvents",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });
// //ChildrenStories -> user relationship
// UserModel.hasMany(ChildrenStoriesModel);
// ChildrenStoriesModel.belongsTo(UserModel, {
// 	through: "UserChildrenStories",
// 	foreignKey: {
// 		name: "UserId",
// 		type: DataTypes.UUID,
// 	},
// });

module.exports = {
  sequelize: sequelize,
  UserModel: UserModel,
  UnitModel: UnitModel,
  PostModel: PostModel,
  ServiceModel: ServiceModel,
  PartnersModel: PartnersModel,
  ContactUsModel: ContactUsModel,
  DonationModel: DonationModel,
  MembershipModel: MembershipModel,
  ResponseModel: ResponseModel,
  BibleStudyModel: BibleStudyModel,
  BibleStudyScheduleModel: BibleStudyScheduleModel,
  PrayerRequestsModel: PrayerRequestsModel,
  PrayerMeetingBulletinModel: PrayerMeetingBulletinModel,
  MeditationModel: MeditationModel,
  SliderModel: SliderModel,
  BibleStoriesModel: BibleStoriesModel,
  ChildrenSongsModel: ChildrenSongsModel,
  MemoryVerseModel: MemoryVerseModel,
  AlumniAnnouncementModel: AlumniAnnouncementModel,
  TestimonialsModel: TestimonialsModel,
  AlumniMembershipModel: AlumniMembershipModel,
  MembersOfCouncilModel: MembersOfCouncilModel,
  BoardOfTrusteeModel: BoardOfTrusteeModel,
  EventsModel: EventsModel,
  LiveStreamingModel: LiveStreamingModel,
  ChildrenStoriesModel: ChildrenStoriesModel
};