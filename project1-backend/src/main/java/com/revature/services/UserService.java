package com.revature.services;

import com.revature.models.User;

import java.util.List;

public interface UserService {

    //Trivial Services
    public User addUser(User user);
    public User getUser(int id);
    public List<User> getAllUsers();
    public User updateUser(User change, int userId);
    public boolean deleteUser(int id);

}