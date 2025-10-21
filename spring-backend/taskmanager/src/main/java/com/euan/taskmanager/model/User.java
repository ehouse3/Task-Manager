package com.euan.taskmanager.model;

import com.euan.taskmanager.utils.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")  
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private UserRole role = UserRole.USER;

  @Column(nullable = false, unique = true)
  private String username;

  @Column(name = "nick_name")
  private String nickName;

  @Column(nullable = false, unique = true)
  private String email;
  
  @Column(nullable = false)
  private String password;  


  
}