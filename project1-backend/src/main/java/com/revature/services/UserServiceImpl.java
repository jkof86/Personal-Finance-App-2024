package com.revature.services;

import com.revature.exceptions.DuplicateUserException;
import com.revature.exceptions.UserNotFoundException;
import com.revature.models.User;
import com.revature.repositories.UserRepository;
import com.revature.util.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    public User addUser(User user) {

        boolean userExists = userRepository.findByEmail(user.getEmail()).isPresent();

        if(userExists){

            throw new DuplicateUserException("User with email " + user.getEmail() + " already exists.");
        }

        return userRepository.save(user);
    }

    public User login(LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User with email " + request.getEmail() + " not found."));

        if(!user.getPassword().equals(request.getPassword())){
            throw new UserNotFoundException("Wrong password, try again!");
        }

        return user;
    }

    @Override
    public User getUser(int id) {
        // throws exception if user with given id was not found.
        return userRepository.findById(id)
                .orElseThrow(
                        () -> new UserNotFoundException("User with id " + id + " not found."));

    }

    @Override
    public List<User> getAllUsers() {

        // should this be allowed for all users?
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User change, int userId) {

        boolean userExists = userRepository.findById(userId).isPresent();

        if(!userExists){
            throw new UserNotFoundException("User with id " + userId + " not found.");
        }


        //in order to resolve unique constraint issues, we create a new record and delete the old one
        User result = userRepository.save(change);
        if(result == null){
                        throw new UserNotFoundException("Update failed ...");
        }

        userRepository.deleteById(userId);
        return result;
    }

    @Override
    public boolean deleteUser(int id) {

        if(!userRepository.existsById(id)){
            throw new UserNotFoundException("User with id " + id + " not found.");
        }

        userRepository.deleteById(id);

        // returns true if user with the give id it's not found.
        return !userRepository.existsById(id);
    }
}