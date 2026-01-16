# CHANGELOG

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-01-16

### Added
- Initial release of Jeu de Piste application
- User authentication system (registration and login)
- Role-based access control (Admin and Participant)
- Game creation and management (Admin only)
- Riddle system with GPS coordinates
- Geolocation validation system
- Distance calculation using Haversine formula
- Interactive maps with Leaflet
- Participation tracking
- Score calculation system
- User dashboard
- Admin dashboard
- Responsive design for mobile and desktop
- PostgreSQL database integration with Prisma ORM
- JWT token-based authentication
- Complete API documentation
- Deployment scripts for multiple platforms
- Backup and restore scripts
- Comprehensive README and deployment guides

### Backend Features
- Express.js REST API
- TypeScript implementation
- Prisma ORM with PostgreSQL
- JWT authentication middleware
- Role-based authorization
- Input validation with express-validator
- CORS configuration
- Error handling middleware
- Database seeding script

### Frontend Features
- React with TypeScript
- React Router for navigation
- Axios for API calls
- Leaflet maps integration
- Real-time geolocation
- Form validation
- Responsive CSS design
- Protected routes
- Admin-only pages

### Database Schema
- Users table with roles
- Games table
- Riddles table with GPS coordinates
- Participations table
- Answers table with validation data

### Security
- Password hashing with bcryptjs
- JWT token authentication
- Protected API endpoints
- Role-based access control
- CORS protection
- Environment variables for sensitive data

### Documentation
- Complete README with installation guide
- API documentation
- Deployment guide for multiple platforms
- Project management guide
- Database backup instructions
- Contributing guidelines

### Scripts
- Development scripts (npm run dev)
- Build scripts (npm run build)
- Database migration scripts
- Seeding scripts
- Backup scripts (Linux/Windows)
- Deployment scripts (Linux/Windows)
- Setup scripts for initial configuration

### Known Issues
- Geolocation requires HTTPS in production
- Some browsers block geolocation by default
- Initial setup requires manual PostgreSQL configuration

### Future Enhancements
- [ ] Real-time multiplayer features
- [ ] Leaderboards
- [ ] Social features (friends, teams)
- [ ] Photo challenges at locations
- [ ] QR code integration
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] In-app messaging
- [ ] Advanced statistics
- [ ] Theme customization

---

## Version History

- **1.0.0** (2026-01-16): Initial release with all core features
