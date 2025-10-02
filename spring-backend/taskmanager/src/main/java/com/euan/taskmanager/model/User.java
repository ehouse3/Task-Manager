package com.euan.taskmanager.model;

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
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;

  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = false, unique = true)
  private String email;
  
  @Column(nullable = false)
  private String password;  


  // public Integer getId() {
  //   return id;
  // }

  // public void setId(Integer id) {
  //   this.id = id;
  // }

  // public String getUsername() {
  //   return username;
  // }

  // public void setUsername(String username) {
  //   this.username = username;
  // }

  // public String getEmail() {
  //   return email;
  // }

  // public void setEmail(String email) {
  //   this.email = email;
  // }

  // public String getPassword() {
  //   return password;
  // }

  // public void setPassword(String password) {
  //   this.password = password;
  // }
}