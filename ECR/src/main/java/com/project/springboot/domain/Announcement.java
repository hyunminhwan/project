package com.project.springboot.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Announcement {

    @Id
    @SequenceGenerator(
            name = "boardseq",
            sequenceName = "board_no_seq",
            allocationSize = 1
    )
    @GeneratedValue(generator = "boardseq")
    @Column(name = "board_no")
    private Long boardNo; // 공지사항 번호

    @Column(name = "board_title")
    private String boardTitle; // 공지사항의 제목

    @Column(name = "board_content")
    private String boardContent; // 공지사항의 내용

    private String managerId; // 관리자 아이디

    @ColumnDefault("0")
    private Long boardCount = 0L; // 조회수 초기값 설정

    @CreatedDate
    @Column(name = "board_create_date")
    private LocalDateTime boardCreateDate; // 공지사항의 생성일자

    @LastModifiedDate
    @Column(name = "board_update_date")
    private LocalDateTime boardUpdateDate; // 공지사항의 수정일자

    // 조회수를 증가시키는 메서드
    public void increaseViewCount() {
        this.boardCount++;
    }
}
